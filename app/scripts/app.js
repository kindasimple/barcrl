'use strict';

angular
  .module('barcrlApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'module.service',
    'module.controller',
    'module.controller.recent',
    'module.filter',
    'ui.bootstrap',
    'ngSlider',
    'chieffancypants.loadingBar',
    'google-maps',
    'ui.sortable'
  ])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Crawl/:barId', {
        templateUrl: '/views/crawl.html',
        controller: 'CrawlCtrl',
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      // .when('/recent', {
      //   templateUrl: 'views/recent.html',
      //   controller: 'RecentCtrl'
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // configure html5 to allow make up for lack of url rewriting on gh-pages
    $locationProvider.html5Mode(false);
  }])

  .factory('recent', ['$cookies', function ($cookies) {
    return {
      addRecent: function (guid) {
        $cookies.recent.push(guid);
      },
      getRecent: function () {
        return $cookies.recent || {};
      }
    };
  }]);