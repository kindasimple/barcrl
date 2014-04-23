'use strict';

angular.module('module.controller')

.controller('CrawlCtrl', ['$scope', '$modal', '$log', '$location', 'crawlrService', 'barService', 'historyService', 'cfpLoadingBar', '$routeParams', function($scope, $modal, $log, $location, crawlrService, barService, historyService, cfpLoadingBar, $routeParams){
  $scope.bars = barService.getBars();

  $scope.specials = barService.getSpecials();

  $scope.preferences = {
    cost: '50',
    alcohol: '50',
    distance: '50',
    length: '10'
  };

  $scope.queryRunning = false;

  $scope.map = {
    center: {
      latitude: 40.7948,
      longitude: -77.8590
    },
    zoom: 13,
    markers: [],
    polyline: {
      visible: true,
      fill: { color: '#FF0000', opacity: 1.0},
      stroke: { color: '#FF0000', weight: 10, opacity: 1.0},
      path: [
        {
          latitude: 0.0,
          longitude: 0.0
        },
        {
          latitude: 0.0,
          longitude: 0.001
        }
      ]
    },
    icon: '//maps.gstatic.com/mapfiles/markers2/marker.png'
  };

  $scope.barDetail = {
    isVisible: false,
    setBar: function (bar) {
      this.bar = bar;
      var baseUrl = location.protocol + '//' + location.hostname + ':' + $location.port() +  location.pathname;
      this.image = baseUrl + 'images/bars/' + bar.id.toLowerCase() + '.png';
      this.specials = this.getSpecials();
    },
    getSpecials: function () {
      var specials = [];
      if(this.bar !== undefined) {
        var that = this;
        $scope.specials.forEach(function (special) {
          if(that.bar.id === special.id) {
            specials.push(special);
          }
        });
      }
      return specials;
    }
  };

  $scope.displayMarkers = function (route) {
    //$log.debug(route);
  };

  function saveRequest(requestId){
    $scope.requestId = requestId;
  }

  function loadRoutes(routes) {
    $scope.routes = routes;
    $scope.map.markers = getMarkersFromRoutes(routes);
    $scope.map.polyline.path = $scope.map.markers;
  }

  function getMarkersFromRoutes (routes) {
    var markers = [];
    var route = routes[0];
    var position = 0;
    route.bars.forEach(function(barId){
      position = position + 1;
      var bar = getBarByBarId(barId);
      markers.push( getMarkerFromBar(position, bar) );
    });
    return markers;
  }

  function getMarkerFromBar (position, bar) {
    return { position: position, id: bar.id, name: bar.name, latitude: bar.lat, longitude: bar.lon };
  }

  function getBarByBarId(barId) {
    for(var barData in $scope.bars) {
      if($scope.bars[barData].id === barId) {
        return $scope.bars[barData];
      }
    }
  }

  function showStatusAsBusy(message) {
    message = typeof message !== 'undefined' ? message : 'Creating Bar Crawl'; //set default
    $scope.status = message;
    $scope.queryRunning = true;
    cfpLoadingBar.start();
  }

  function showStatusAsReady(message) {
    message = typeof message !== 'undefined' ? message : 'Creating Bar Crawl'; //set default
    $scope.status = message;
    $scope.queryRunning = false;
    cfpLoadingBar.complete();
  }

  function getFirstMarker(){
    $scope.map.markers = [];
    var bar = getBarByBarId($routeParams.barId);
    $scope.map.markers.push( getMarkerFromBar(1, bar) );
  }

  function getFirstBarDetails(barId){
    $scope.barDetail.bar = {};
    var bar = getBarByBarId(barId);
    $scope.barDetail.setBar(bar);
    $scope.barDetail.visible = true;
  }

  $scope.showDetail = function (marker) {
    $scope.barDetail.setBar( getBarByBarId(marker.id) );
    $scope.visible = true;
  };

  $scope.refineTour=function(){

    crawlrService.getPreferenceRouteRequestId($scope.preferences.cost,$scope.preferences.alcohol,$scope.preferences.distance,$scope.preferences.startingBarId)
      .then(function(requestId) {
        showStatusAsBusy('Creating a Custom Bar Crawl based on your preferences.');
        saveRequest(requestId);
        var r = requestId;
        setTimeout( function () {
          crawlrService.getResult(r)
          .then(function(routes){
            loadRoutes(routes);
            historyService.addResult(r, routes);
            showStatusAsReady('We created a custom tour for you!');
          });
        }, 7000);
      });
  };

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'crawlPreferences.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        preferences: function () {
          return $scope.preferences;
        }
      }
    });

    modalInstance.result.then(function (preferences) {
      $scope.preferences.cost = preferences.cost;
      $scope.preferences.alcohol = preferences.alcohol;
      $scope.preferences.distance = preferences.distance;
      $scope.preferences.length = preferences.length;
      $scope.refineTour();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  function pollRouteAPI(requestId, messageOnComplete, callback){
    crawlrService.getResult(requestId)
      .then(function (routes) {
        routeResultCallback(requestId, routes, messageOnComplete, callback);
      });
  }

  function routeResultCallback (requestId, routes, message, callback) {
    loadRoutes(routes);

    //$scope.$apply();
    showStatusAsReady(message);
    if(callback) {
      callback(requestId, routes);
    }
  }

  function init(){
    if($routeParams.requestId){
      $scope.requestId = $routeParams.requestId;
      pollRouteAPI($routeParams.requestId, 'Here is your saved tour!', function(requestId, routes) {
        var startingBarId = routes[0].bars[0];
        getFirstBarDetails(startingBarId);
        $scope.preferences.startingBarId = startingBarId;
      });
      
    } else {
      //do init
      var startingBarId = $routeParams.barId;
      $scope.preferences.startingBarId = startingBarId;
      getFirstMarker();
      getFirstBarDetails(startingBarId);

      crawlrService.getGenericRouteRequestId(startingBarId)
        .then(function(requestId) {
          showStatusAsBusy('Creating a Generic Bar Crawl');
          saveRequest(requestId);
          var r = requestId;
          setTimeout( function () {
            pollRouteAPI(r, 'We found you a tour! You can refine it if you\'d like.', function(requestId, routes) {
              historyService.addResult(requestId, routes, $scope.preferences);
            });
          }, 7000);
        });
    }
  }

  init();
}])


.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'preferences', function ($scope, $modalInstance, preferences) {
  $scope.preferences = preferences;
 
//initiate length slider parms
  $scope.selectedLength = $scope.preferences.length;
  $scope.optionsLength = {
    from: 1,
    to: 20,
    step: 1,
    dimension: ''
  };
  
  //initiate cost slider parms
  $scope.selectedCost = $scope.preferences.cost;
  $scope.optionsCost = {
    from: 1,
    to: 100,
    step: 1,
    dimension: '  $$'
  };
    
  //initiate alc slider parms
  $scope.selectedAlcohol = $scope.preferences.alcohol;
  $scope.optionsAlc = {
    from: 1,
    to: 100,
    step: 1,
    dimension: ''
  };
    
  //initiate distance slider parms
  $scope.selectedDistance = $scope.preferences.distance;
  $scope.optionsDist = {
    from: 1,
    to: 100,
    step: 1,
    dimension: ''
  };
 
  $scope.ok = function () {
    $modalInstance.close({
      cost: this.selectedCost,
      alcohol: this.selectedAlcohol,
      distance: this.selectedDistance,
      length: this.selectedLength
    });
    console.log(this.selectedLength);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);
  