'use strict';

angular.module('module.controller')

.controller('CrawlCtrl', ['$scope', '$modal', '$log', '$location', 'crawlrService', 'barService', 'cfpLoadingBar', '$routeParams', function($scope, $modal, $log, $location, crawlrService, barService, cfpLoadingBar, $routeParams){
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

  function getFirstBarDetails(){
    $scope.barDetail.bar = {};
    var bar = getBarByBarId($routeParams.barId);
    $scope.barDetail.setBar(bar);
    $scope.barDetail.visible = true;
  }

  $scope.showDetail = function (marker) {
    $scope.barDetail.setBar( getBarByBarId(marker.id) );
    $scope.visible = true;
  };

  //do init
  getFirstMarker();
  getFirstBarDetails();
  //end init

  crawlrService.getGenericRouteRequestId($routeParams.barId)
    .then(function(result) {
      showStatusAsBusy('Creating a Generic Bar Crawl');
      saveRequest(result);
      var r = result;
      setTimeout( function () {
        crawlrService.getResult(r)
        .then(function(result){
          loadRoutes(result);
          showStatusAsReady('We found you a tour! You can refine it if you\'d like.');
        });
      }, 7000);
    });

  $scope.refineTour=function(){

    crawlrService.getPreferenceRouteRequestId($scope.preferences.cost,$scope.preferences.alcohol,$scope.preferences.distance,$routeParams.barId)
      .then(function(result) {
        showStatusAsBusy('Creating a Custom Bar Crawl based on your preferences.');
        saveRequest(result);
        var r = result;
        setTimeout( function () {
          crawlrService.getResult(r)
          .then(function(result){
            loadRoutes(result);
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
      $scope.preferences = preferences;
      $scope.refineTour();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

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
      cost: $scope.selectedCost,
      alcohol: $scope.selectedAlcohol,
      distance: $scope.selectedDistance,
      length: $scope.selectedLength
    });
    console.log($scope.selectedLength);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);
  