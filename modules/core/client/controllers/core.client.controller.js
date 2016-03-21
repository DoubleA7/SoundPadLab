'use strict';

angular.module('core').controller('CoreController', ['$scope', '$state',
  function ($scope, $state) {
    $scope.showHeader = false;

    $scope.init = function() {
      //alert('Init function call');
      if ($state.includes('core.home') && !$state.includes('admin')) {
        //alert('header set to false');
        $scope.showHeader = false;
      } else {
        //alert('header set to true');
        $scope.showHeader = true;
      }
    };
  }
]);