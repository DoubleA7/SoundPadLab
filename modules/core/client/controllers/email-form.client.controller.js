'use strict';

angular.module('core').controller('EmailFormController', ['$scope', '$uibModalInstance', 'subject',
  function($scope, $uibModalInstance, subject) {
    
    $scope.subject = subject;
  }
]);