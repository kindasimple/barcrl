'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('barcrlApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    google = function(){ console.log('mocking google'); };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of bars to the scope', function () {
    expect(scope.bars.length).toBe(26);
  });
});
