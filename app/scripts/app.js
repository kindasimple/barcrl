'use strict';

angular
  .module('barcrlApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'module.service',
    'module.controller',
    'module.filter',
    'ui.bootstrap'
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

      .otherwise({
        redirectTo: '/'
      });

    // configure html5 to allow make up for lack of url rewriting on gh-pages
    $locationProvider.html5Mode(false);
  }]);