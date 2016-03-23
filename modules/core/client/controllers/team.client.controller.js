(function() {
  'use strict';

  angular
    .module('core')
    .controller('TeamController', TeamController);

  TeamController.$inject = ['$scope'];

  function TeamController($scope) {
    var vm = this;

    // Team controller logic
    // ...

    init();

    function init() {
      console.log('In TeamController');
      
    }
  }
})();
