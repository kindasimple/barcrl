'use strict';

angular.module('module.controller', ['module.service'])
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.bars = [
      { id: 'Inferno', name: 'Inferno'},
      { id: 'Bar.Bleu', name: 'Bar Bleu'},
      { id: 'Pickles', name: 'Pickles'}
    ];
  }])

  .controller('CrawlCtrl', ['$scope', 'crawlrService', 'cfpLoadingBar', function($scope, crawlrService, cfpLoadingBar){
	  
	  //initiate cost slider parms
	  $scope.costValue = "50";
      $scope.optionsCost = {       
        from: 1,
        to: 100,
        step: 1,
        dimension: "  $$"         
      };
      
      //initiate alc slider parms
	  $scope.alcValue = "50";
      $scope.optionsAlc = {       
        from: 1,
        to: 100,
        step: 1,
        dimension: ""         
      };
      
      //initiate distance slider parms
	  $scope.distValue = "50";
      $scope.optionsDist = {       
        from: 1,
        to: 100,
        step: 1,
        dimension: ""         
      };
	  
	  $scope.start = 'Inferno';
//	  $scope.costs = [
//	    {name:1},
//	    {name:10},
//	    {name:100}
//	  ];
//	  
//	  $scope.alcohols = [
//      {name:1},
//      {name:10},
//      {name:100}
//    ];
	  
//	  $scope.distances = [
//      {name:1},
//      {name:10},
//      {name:100}
//    ];
	  
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
  }]);

