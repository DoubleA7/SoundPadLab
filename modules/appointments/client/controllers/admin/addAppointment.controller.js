'use strict';

angular.module('appointments.admin').controller('addAppointmentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'participantsAdmin',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, participantsAdmin) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    participantsAdmin.query(function (data) {
      	console.log(data);
      $scope.participants= data;
    });

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

	
    $scope.addAppointment = function (isValid) {
      	console.log("ADD APPOINTMENT!");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'audioForm');
		console.log("NOT VALID");
        return false;
      }

      $http.post('/api/appointments', $scope.credentials).success(function (response) {
      	console.log("Sucess!");
        // And redirect to the previous or list of users 
        $state.go('admin.appointments', $state.previous.params);
      }).error(function (response) {
      	console.log("FAIL!");
        $scope.error = response.message;
      });
    };

  
  }
]);
