'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.goToContact = function() {
      $state.go('core.contact');
      alert('Switch to contact');
    };

    $scope.goToTeam = function() {
      $state.go('core.team');
      alert('Switch to team');
    };
  }
]);
