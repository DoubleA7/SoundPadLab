'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication', 'PasswordValidator',
  function ($scope, $http, Authentication, PasswordValidator) {
    
    $scope.user = Authentication.user; // Get authentication context
    $scope.popoverMsg = PasswordValidator.getPopoverMsg(); // Set popover

    // Change user password
    $scope.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      // Check if form is valid
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      // Update database
      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
        
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);
