'use strict';

angular.module('module.service')

  .factory('historyService', ['$cookieStore', function ($cookieStore) {
    return {
      addResult: function (guid, routes, name) {
        var history = $cookieStore.get('history');
        if(!history) {
          history = [];
        }
        while(history.length > 50) {
          history.pop();
        }
        history.push({ guid: guid, timestamp: new Date().getTime(), name: name });
        $cookieStore.put('history', history);
      },
      getRecent: function () {
        //$cookieStore.put('history', []);
        return $cookieStore.get('history') || {};
      }
    };
  }]);