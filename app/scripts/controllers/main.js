'use strict';

angular.module('module.controller', ['module.service'])

  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.bars = [
      { id: 'Allen.St..Grill', name : 'Allen St. Grill', lat:'40.794302', lon:'-77.861613' },
      { id: 'Bar.Bleu', name : 'Bar Bleu', lat:'40.79773', lon:'-77.856613' },
      { id: 'The.Brewery', name : 'The Brewery', lat:'40.794952', lon:'-77.858437' },
      { id: 'Cafe.210', name : 'Cafe 210', lat:'40.793246', lon:'-77.862986' },
      { id: 'Chilis', name : 'Chilis', lat:'40.793864', lon:'-77.860543' },
      { id: 'Chrome', name : 'Chrome', lat:'40.791849', lon:'-77.862299' },
      { id: 'Chumleys', name : 'Chumley\'s', lat:'40.794188', lon:'-77.861763' },
      { id: 'Darkhorse.Tavern', name : 'Darkhorse Tavern', lat:'40.79466', lon:'-77.860218' },
      { id: 'Gingerbread.Man', name : 'Gingerbread Man', lat:'40.796706', lon:'-77.856849' },
      { id: 'Indigo', name : 'Indigo', lat:'40.794123', lon:'-77.861806' },
      { id: 'Inferno', name : 'Inferno', lat:'40.797535', lon:'-77.857321' },
      { id: 'Kildares', name : 'Kildares', lat:'40.800109', lon:'-77.85379' },
      { id: 'Levels', name : 'Levels', lat:'40.798233', lon:'-77.85627' },
      { id: 'Lions.Den', name : 'Lion\'s Den', lat:'40.797523', lon:'-77.856519' },
      { id: 'Local.Whiskey', name : 'Local Whiskey', lat:'40.793683', lon:'-77.860092' },
      { id: 'Mad.Mex', name : 'Mad Mex', lat:'40.793872', lon:'-77.85852' },
      { id: 'The.Phyrst', name : 'The Phyrst', lat:'40.793683', lon:'-77.860092' },
      { id: 'Bill.Pickles.Tap.Room', name : 'Bill Pickles Tap Room', lat:'40.794156', lon:'-77.861386' },
      { id: 'The.Rathskeller', name : 'The Rathskeller', lat:'40.795151', lon:'-77.860357' },
      { id: 'Rotellis', name : 'Rotellis', lat:'40.795699', lon:'-77.858772' },
      { id: 'Rumors.Lounge', name : 'Rumors Lounge', lat:'40.791536', lon:'-77.864552' },
      { id: 'The.Saloon', name : 'The Saloon', lat:'40.797315', lon:'-77.857395' },
      { id: 'The.Shandygaff', name : 'The Shandygaff', lat:'40.795301', lon:'-77.859534' },
      { id: 'The.Tavern.Restaurant', name : 'The Tavern Restaurant', lat:'40.795677', lon:'-77.859783' },
      { id: 'Z.Bar...The.Deli', name : 'Z Bar @ The Deli', lat:'40.797133', lon:'-77.857179' },
      { id: 'Zenos', name : 'Zenos', lat:'40.79432', lon:'-77.861621' }
    ];
  }])

  .controller('CrawlCtrl', ['$scope', '$modal', '$log', 'crawlrService', 'cfpLoadingBar', '$routeParams', function($scope, $modal, $log, crawlrService, cfpLoadingBar, $routeParams){
    $scope.bars = [
      { id: 'Allen.St..Grill', name : 'Allen St. Grill', lat:'40.794302', lon:'-77.861613' },
      { id: 'Bar.Bleu', name : 'Bar Bleu', lat:'40.79773', lon:'-77.856613' },
      { id: 'The.Brewery', name : 'The Brewery', lat:'40.794952', lon:'-77.858437' },
      { id: 'Cafe.210', name : 'Cafe 210', lat:'40.793246', lon:'-77.862986' },
      { id: 'Chilis', name : 'Chilis', lat:'40.793864', lon:'-77.860543' },
      { id: 'Chrome', name : 'Chrome', lat:'40.791849', lon:'-77.862299' },
      { id: 'Chumleys', name : 'Chumley\'s', lat:'40.794188', lon:'-77.861763' },
      { id: 'Darkhorse.Tavern', name : 'Darkhorse Tavern', lat:'40.79466', lon:'-77.860218' },
      { id: 'Gingerbread.Man', name : 'Gingerbread Man', lat:'40.796706', lon:'-77.856849' },
      { id: 'Indigo', name : 'Indigo', lat:'40.794123', lon:'-77.861806' },
      { id: 'Inferno', name : 'Inferno', lat:'40.797535', lon:'-77.857321' },
      { id: 'Kildares', name : 'Kildares', lat:'40.800109', lon:'-77.85379' },
      { id: 'Levels', name : 'Levels', lat:'40.798233', lon:'-77.85627' },
      { id: 'Lions.Den', name : 'Lion\'s Den', lat:'40.797523', lon:'-77.856519' },
      { id: 'Local.Whiskey', name : 'Local Whiskey', lat:'40.793683', lon:'-77.860092' },
      { id: 'Mad.Mex', name : 'Mad Mex', lat:'40.793872', lon:'-77.85852' },
      { id: 'The.Phyrst', name : 'The Phyrst', lat:'40.793683', lon:'-77.860092' },
      { id: 'Bill.Pickles.Tap.Room', name : 'Bill Pickles Tap Room', lat:'40.794156', lon:'-77.861386' },
      { id: 'The.Rathskeller', name : 'The Rathskeller', lat:'40.795151', lon:'-77.860357' },
      { id: 'Rotellis', name : 'Rotellis', lat:'40.795699', lon:'-77.858772' },
      { id: 'Rumors.Lounge', name : 'Rumors Lounge', lat:'40.791536', lon:'-77.864552' },
      { id: 'The.Saloon', name : 'The Saloon', lat:'40.797315', lon:'-77.857395' },
      { id: 'The.Shandygaff', name : 'The Shandygaff', lat:'40.795301', lon:'-77.859534' },
      { id: 'The.Tavern.Restaurant', name : 'The Tavern Restaurant', lat:'40.795677', lon:'-77.859783' },
      { id: 'Z.Bar...The.Deli', name : 'Z Bar @ The Deli', lat:'40.797133', lon:'-77.857179' },
      { id: 'Zenos', name : 'Zenos', lat:'40.79432', lon:'-77.861621' }
    ];

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
        path: [{
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

    $scope.displayMarkers = function (route) {
      console.log(route);
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
      var thisScope = $scope;
      var position = 0;
      route.bars.forEach(function(bar){
        position = position + 1;
        for(var barData in thisScope.bars) {
          if(thisScope.bars[barData].id === bar) {
            var data = thisScope.bars[barData];
            markers.push({ position: position, id: data.id, name: data.name, latitude: data.lat, longitude: data.lon});
            break;
          }
        }
      });
      return markers;
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
//};  
  
}]);
  
  


