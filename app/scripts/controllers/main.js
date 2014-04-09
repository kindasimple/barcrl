'use strict';

angular.module('barcrlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.bars = [
      { id: 'Inferno', name: 'Inferno'},
      { id: 'Bar.Bleu', name: 'Bar Bleu'},
      { id: 'Pickles', name: 'Pickles'}
    ];

    
  })

  .controller('CrawlCtrl', function($scope, crawlrService){
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

//    crawlrService.getGenericRouteRequestId()
//      .then(function(result) {
//        saveRequest(result);
//        var r = result;
//        setTimeout( function () {
//          crawlrService.getResult(r)
//          .then(function(result){
//            loadRoutes(result);
//          });
//        }, 7000);
//      });
    
    crawlrService.getPreferenceRouteRequestId(10,5,8,'Inferno')
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
  });