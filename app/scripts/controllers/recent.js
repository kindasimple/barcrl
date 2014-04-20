'use strict';

angular.module('module.controller')

  .controller('RecentCtrl', ['$scope', 'recent', function ($scope, recent) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.history = [
      {
        timestamp: '4-14-14  2:20',
        guid: 'sdfasdfdsfsdf',
        permalink: 'http://kindasimple.com'
      }
    ];

    function setup () {
      $scope.$watch('history', function (oldValue, newValue) {
        if (oldValue !== newValue) {
          //recent.add;
        }
      });
    }

    setup();
  }]);