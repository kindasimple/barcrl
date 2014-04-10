'use strict';

angular.module('module.controller', ['module.service'])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.bars = [
      { id: 'Inferno', name: 'Inferno'},
      { id: 'Bar.Bleu', name: 'Bar Bleu'},
      { id: 'Pickles', name: 'Pickles'}
    ];
  }])

  .controller('CrawlCtrl', ['$scope', 'crawlrService', function($scope, crawlrService){
    $scope.start = 'Inferno';

	  $scope.costs = [
	    {name:1},
	    {name:10},
	    {name:100}
	  ];
	  
	  $scope.alcohols = [
      {name:1},
      {name:10},
      {name:100}
    ];
	  
	  $scope.distances = [
      {name:1},
      {name:10},
      {name:100}
    ];
	  
	  function saveRequest(requestId){
      $scope.requestId = requestId;
    }

    function loadRoutes(routes) {
      $scope.routes = routes;
    }

    crawlrService.getGenericRouteRequestId($scope.start)
      .then(function(result) {
        saveRequest(result);
        var r = result;
        setTimeout( function () {
          crawlrService.getResult(r)
          .then(function(result){
            loadRoutes(result);
          });
        }, 7000);
      });
    
    $scope.refineTour=function(){
      console.log('Something should happen');
      console.log($scope.cost.name);

      crawlrService.getPreferenceRouteRequestId($scope.cost.name,$scope.alcohol.name,$scope.distance.name,$scope.start)
        .then(function(result) {
          saveRequest(result);
          var r = result;
          setTimeout( function () {
            crawlrService.getResult(r)
            .then(function(result){
              loadRoutes(result);
            });
          }, 7000);
        });
    };
  }]);

