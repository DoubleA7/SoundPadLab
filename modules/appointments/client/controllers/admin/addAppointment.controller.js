'use strict';

angular.module('appointments.admin').controller('addAppointmentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'participantsAdmin',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, participantsAdmin) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    participantsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
		$scope.error = "No Participants to schedule!";
	  }else{
		$scope.error = null;
		$scope.participants= data;
	  }
    });
        
            $('#datetimepicker11').datetimepicker({
            });
        
    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;


    $scope.addAppointment = function (isValid) {
      console.log('ADD APPOINTMENT');
      $scope.error = null;
	  $scope.credentials.time = $('#datetimepicker11').data("DateTimePicker").date();
      console.log($scope.credentials);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');
        console.log('NOT VALID');

        return false;
      }

      $http.post('/api/appointments', $scope.credentials).success(function (response) {
        console.log("Sucess!");
        // And redirect to the previous or list of users 
        $state.go('admin.appointments', $state.previous.params);
      }).error(function (response) {
        console.log('FAIL!');
        $scope.error = response.message;
      });
    };

  
  }
]);
