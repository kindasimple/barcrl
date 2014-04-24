// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      //angular stuff
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      //3rd party
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js',
      'app/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      'app/bower_components/angular-ui/build/angular-ui.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/jquery-ui/ui/jquery-ui.js',
      'app/bower_components/ng-slider/src/ng-slider.js',
      'app/bower_components/angular-loading-bar/src/loading-bar.js',
      'app/bower_components/angular-moment/angular-moment.js',
      'app/bower_components/moment/moment.js',
      //Google Maps
      'http://maps.googleapis.com/maps/api/js?sensor=false',
      'app/bower_components/underscore/underscore.js',
      'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
      //project files
      'app/scripts/app.js',
      'app/scripts/services/crawlrService.js',
      'app/scripts/controllers/main.js',
      'app/scripts/**/*.js',
      //testing files
      'test/mock/**/*.js',
      'test/spec/**/*.js'

    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
