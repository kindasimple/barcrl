'use strict';

angular.module('barcrlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.bars = [
      { id: 'Inferno', name: 'Inferno'},
      { id: 'Bar.Bleu', name: 'Bar Bleu'},
      { id: 'Pickles', name: 'Pickles'}
    ];

    $scope.isDoneLoading = false;
  })

  .controller('CrawlCtrl', function($scope, crawlrService){
    function saveRequest(requestId){
      $scope.requestId = requestId;
    }

    function loadRoutes(routes) {
      $scope.routes = routes;
    }

    crawlrService.getRequestId()
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