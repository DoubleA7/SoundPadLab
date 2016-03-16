(function() {
  'use strict';

  angular
    .module('core')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope'];

  function ContactController($scope) {
    var vm = this;

    // Contact controller logic
    // ...

    console.log('ContactController');

    init();

    function init() {
      console.log('ContactController');
    }
  }
})();
