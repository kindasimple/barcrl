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

      .when('/history/:requestId', {
        templateUrl: 'views/crawl.html',
        controller: 'CrawlCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // configure html5 to allow make up for lack of url rewriting on gh-pages
    $locationProvider.html5Mode(false);
  }]);