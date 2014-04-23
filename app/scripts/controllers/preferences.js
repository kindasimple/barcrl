'use strict';

angular.module('module.controller')

.controller('PreferencesCtrl', ['$scope', '$modalInstance', 'preferences', function ($scope, $modalInstance, preferences) {
  $scope.preferences = preferences;
 
//initiate length slider parms
  $scope.selectedLength = $scope.preferences.length;
  $scope.optionsLength = {
    from: 1,
    to: 20,
    step: 1,
    dimension: ''
  };
  
  //initiate cost slider parms
  $scope.selectedCost = $scope.preferences.cost;
  $scope.optionsCost = {
    from: 1,
    to: 100,
    step: 1,
    dimension: '  $$'
  };
    
  //initiate alc slider parms
  $scope.selectedAlcohol = $scope.preferences.alcohol;
  $scope.optionsAlc = {
    from: 1,
    to: 100,
    step: 1,
    dimension: ''
  };
    
  //initiate distance slider parms
  $scope.selectedDistance = $scope.preferences.distance;
  $scope.optionsDist = {
    from: 1,
    to: 100,
    step: 1,
    dimension: ''
  };
 
  $scope.ok = function () {
    $modalInstance.close({
      cost: this.selectedCost,
      alcohol: this.selectedAlcohol,
      distance: this.selectedDistance,
      length: this.selectedLength
    });
    console.log(this.selectedLength);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  
}]);
  