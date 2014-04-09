'use strict';
var serviceModule = angular.module('module.service', []);

serviceModule.service('crawlrService', ['$http', '$q', function($http, $q){
  return {
    getRequestId: function () {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://crawlrapi.herokuapp.com/route/Inferno'
      })
      .success(function(result) {
        deferred.resolve(result);
      })
      .error(function () {
        deferred.reject('Error getting crawlr front page.');
      });
      return deferred.promise;
    },
    getResult: function (requestId) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://crawlrapi.herokuapp.com/result/' + requestId + '/.json'
      })
      .success(function(result) {
        deferred.resolve(angular.fromJson(result).tours);
      })
      .error(function () {
        deferred.reject('Error getting crawlr front page.');
      });
      return deferred.promise;
    }
  };
}]);