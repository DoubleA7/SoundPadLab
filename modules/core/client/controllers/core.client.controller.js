'use strict';

angular.module('core').controller('CoreController', ['$scope', '$state',
  function ($scope, $state) {
    $scope.showHeader = true;
    $scope.$state = $state;
    console.log('Inside core controller');
    console.log($scope);
    $scope.init = function() {
    };
  }
]);
