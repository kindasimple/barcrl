angular.module('module.filter', [])

  .filter('ReplaceDots', function(){
    return function(input, replacement){
      return input.replace(/\./g, replacement);
    };
  });