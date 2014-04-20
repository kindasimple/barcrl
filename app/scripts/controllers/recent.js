'use strict';

angular.module('module.controller.recent', [])
  .controller('RecentCtrl', ['$scope', 'recent', function ($scope, recent) {
    $scope.recent = [];//[{guid: 'sdfasdfdsfsdf', permalink: 'http://kindasimple.com'}];

    function setup () {
	    $scope.$watch('recent', function (oldvalue, newValue) {
	        if (oldValue !== newValue) recent.add;
	    });
    }

    setup();
  }]);
