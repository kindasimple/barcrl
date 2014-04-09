'use strict';

angular
  .module('barcrlApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'module.service',
    'ui.bootstrap'
  ])

  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/Crawl/:barId', {
        templateUrl: '/views/crawl.html',
        controller: 'CrawlCtrl',
        resolve: {
          // I will cause a 1 second delay
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }
        }
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
    
    
  });