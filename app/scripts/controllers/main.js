'use strict';

angular.module('module.controller', ['module.service'])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.bars = [
      { id: 'Allen.St..Grill', name : 'Allen St. Grill' },
      { id: 'Bar.Bleu', name : 'Bar Bleu' },
      { id: 'The.Brewery', name : 'The Brewery' },
      { id: 'Cafe.210', name : 'Cafe 210' },
      { id: 'Chilis', name : 'Chilis' },
      { id: 'Chrome', name : 'Chrome' },
      { id: 'Chumleys', name : 'Chumley\'s' },
      { id: 'Darkhorse.Tavern', name : 'Darkhorse Tavern' },
      { id: 'Gingerbread.Man', name : 'Gingerbread Man' },
      { id: 'Indigo', name : 'Indigo' },
      { id: 'Inferno', name : 'Inferno' },
      { id: 'Kildares', name : 'Kildares' },
      { id: 'Levels', name : 'Levels' },
      { id: 'Lions.Den', name : 'Lion\'s Den' },
      { id: 'Local.Whiskey', name : 'Local Whiskey' },
      { id: 'Mad.Mex', name : 'Mad Mex' },
      { id: 'The.Phyrst', name : 'The Phyrst' },
      { id: 'Bill.Pickles.Tap.Room', name : 'Bill Pickles Tap Room' },
      { id: 'The.Rathskeller', name : 'The Rathskeller' },
      { id: 'Rotellis', name : 'Rotellis' },
      { id: 'Rumors.Lounge', name : 'Rumors Lounge' },
      { id: 'The.Saloon', name : 'The Saloon' },
      { id: 'The.Shandygaff', name : 'The Shandygaff' },
      { id: 'The.Tavern.Restaurant', name : 'The Tavern Restaurant' },
      { id: 'Z.Bar...The.Deli', name : 'Z Bar @ The Deli' },
      { id: 'Zenos', name : 'Zenos' }
    ];
    
    $scope.numbers = [
      {name: '1'},
      {name: '2'},
      {name: '3'},
      {name: '4'},
      {name: '5'},
      {name: '6'},
      {name: '7'},
      {name: '8'},
      {name: '9'},
      {name: '10'},
    ];
    
    $scope.$broadcast($scope.numbers);
  }])

  .controller('CrawlCtrl', ['$scope', '$modal', '$log', 'crawlrService', 'cfpLoadingBar', '$routeParams', function($scope, $modal, $log, crawlrService, cfpLoadingBar, $routeParams){
    
    $scope.preferences = {
      cost: '50',
      alcohol: '50',
      distance: '50'
    };

    function saveRequest(requestId){
      $scope.requestId = requestId;
    }

    function loadRoutes(routes) {
      $scope.routes = routes;
    }

    function showStatusAsBusy(message) {
      message = typeof message !== 'undefined' ? message : 'Creating Bar Crawl'; //set default
      $scope.status = message;
      cfpLoadingBar.start();
    }

    function showStatusAsReady(message) {
      message = typeof message !== 'undefined' ? message : 'Creating Bar Crawl'; //set default
      $scope.status = message;
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
//var ModalInstanceCtrl = function ($scope, $modalInstance, preferences) {
  $scope.preferences = preferences;

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
      distance: $scope.selectedDistance
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
//};
}]);


