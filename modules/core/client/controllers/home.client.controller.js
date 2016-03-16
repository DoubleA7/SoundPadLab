'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.goToContact = function() {
      $state.go('contact');
      alert('Switch to contact');
    };

    $scope.goToTeam = function() {
      $state.go('team');
      alert('Switch to team');
    };
  }
]);
