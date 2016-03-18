'use strict';

angular.module('core').controller('CoreController', ['$scope', '$state',
  function ($scope, $state) {
    $scope.showHeader = false;

    $scope.init = function() {
      alert('Init function call');
      if ($state.includes('core.home')) {
        $scope.showHeader = false;
      } else {
        $scope.showHeader = true;
      }
    };
  }
]);