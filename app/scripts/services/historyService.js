'use strict';

angular.module('module.service')

  .factory('historyService', ['$cookieStore', 'barService', function ($cookieStore, barService) {
    return {
      addResult: function (guid, routes, preferences) {
        var history = $cookieStore.get('history');
        if(!history) {
          history = [];
        }
        while(history.length > 50) {
          history.pop();
        }
        var bar = barService.getBarByBarId(preferences.startingBarId);
        history.push({ guid: guid, timestamp: new Date(), name: 'from ' + bar.name});
        $cookieStore.put('history', history);
      },
      getRecent: function () {
        //$cookieStore.put('history', []);
        return $cookieStore.get('history') || {};
      }
    };
  }]);