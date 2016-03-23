'use strict';

angular.module('appointments').controller('addAppointmentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

	
    $scope.addAppointment = function (isValid) {
      console.log("ADD APPOINTMENT");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');

        return false;
      }

      $http.post('/api/appointments', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.appointments', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

  
  }
]);
