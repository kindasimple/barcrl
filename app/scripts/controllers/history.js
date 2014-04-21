'use strict';

angular.module('module.controller')

.controller('HistoryCtrl', ['$scope', 'historyService', function ($scope, historyService) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $scope.history = historyService.getRecent();

  // $scope.history = [
  //   {
  //     timestamp: '4-14-14  2:20',
  //     guid: 'sdfasdfdsfsdf',
  //     permalink: 'http://kindasimple.com'
  //   }
  // ];

  $scope.$watch('history', function (oldValue, newValue) {
    if (oldValue !== newValue) {
      $scope.history = newValue;
    }
  });
}]);