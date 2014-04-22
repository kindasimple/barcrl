'use strict';

angular.module('module.controller', ['module.service'])

.controller('MainCtrl', ['$scope', '$location', 'barService', function ($scope, $location, barService) {
  $scope.bars = barService.getBars();

  $scope.goRandom = function () {
    var index = Math.floor((Math.random()*100)) % 26;
    $location.path( '/Crawl/' + $scope.bars[index].id );
  };
}]);