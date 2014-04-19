'use strict';
var serviceModule = angular.module('module.service', []);

serviceModule.service('crawlrService', ['$http', '$q', function($http, $q){
  return {
    getGenericRouteRequestId: function (start) {
      var deferred = $q.defer();
      
      $http({
        method: 'GET',
        url: 'http://crawlrapi.herokuapp.com/route/' + start
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
    },
    getPreferenceRouteRequestId: function (cost,alc,distance,start, length) {
        var deferred = $q.defer();
        
        $http({
          method: 'POST',
          url: 'http://crawlrapi.herokuapp.com/route/'+ start,
          data: 'cost=' + cost + '&alcohol=' + alc + '&distance=' + distance +'&length' + length,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(result) {
          deferred.resolve(result);
        })
        .error(function () {
          deferred.reject('Error getting crawlr front page.');
        });
        return deferred.promise;
      }
  };
}]);
