(function() {
  'use strict';

  angular
    .module('core')
    .controller('CoreController', CoreController);

  CoreController.$inject = ['$scope'];

  function CoreController($scope) {
    var vm = this;

    // Core controller logic
    // ...

    init();

    function init() {
    }
  }
})();
