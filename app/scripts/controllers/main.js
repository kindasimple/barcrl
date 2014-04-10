'use strict';

//.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$items', function ($scope, $modalInstance, items) {
var ModalInstanceCtrl = function ($scope, $modalInstance, preferences) {
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
};
//}]);

angular.module('module.controller', ['module.service'])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.bars = [
      { id: 'Inferno', name: 'Inferno'},
      { id: 'Bar.Bleu', name: 'Bar Bleu'},
      { id: 'Pickles', name: 'Pickles'}
    ];
  }])

  .controller('CrawlCtrl', ['$scope', '$modal', '$log', 'crawlrService', 'cfpLoadingBar', function($scope, $modal, $log, crawlrService, cfpLoadingBar){
	  
    $scope.start = 'Inferno';

	  
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

    crawlrService.getGenericRouteRequestId($scope.start)
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
      crawlrService.getPreferenceRouteRequestId($scope.costValue,$scope.alcValue,$scope.disValue,$scope.start)
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

    $scope.preferences = {
      cost: '50',
      alcohol: '50',
      distance: '50'
    };

    $scope.open = function () {

      var modalInstance = $modal.open({
        templateUrl: 'crawlPreferences.html',
        controller: ModalInstanceCtrl,
        resolve: {
          preferences: function () {
            return $scope.preferences;
          }
        }
      });

      modalInstance.result.then(function (preferences) {
        $scope.preferences = preferences;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }]);



