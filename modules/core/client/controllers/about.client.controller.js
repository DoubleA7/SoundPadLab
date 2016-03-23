(function() {
  'use strict';

  angular
    .module('core')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController($scope) {
    var vm = this;

    // About controller logic
    // ...
    /*function event($scope){
      $scope.$emit('someEvent');
    }*/
    function func(){
      console.log('inside func');
      $scope.$apply();
    }
    init();

    function init() {
      console.log('In About Controller!');
      //event($scope);
    }
  }
})();
