'use strict';

angular.module('appointments.admin').controller('addAppointmentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'participantsAdmin', 'appointmentAdmin', 'experimentsAdmin',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, participantsAdmin, appointmentAdmin, experimentsAdmin) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Query appointments from DB
    appointmentAdmin.query(function (data) {
      $scope.appointments = data;
    });

    participantsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No Participants to schedule!';
      }else{
        $scope.error = null;
        $scope.participants= data;
      }
    });

    experimentsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No Experiments to schedule!';
      }else{
        $scope.error = null;
        /*
        var experimentStrings = {};
        for ( var i = 0; i < data.length; i++){
            var string = data[i].experiment_name;
            string = string.concat(':');
            for ( var j = 0; j < data[i].experiment_conditions.length; j++){
                string = string.concat(' '+ data[i].experiment_conditions[j]);
            }
            experimentStrings.data[i] = string;
        }
        console.log(experimentStrings);*/
        $scope.experiments = data;
      }
    });
    
    $('#datetimepicker11').datetimepicker({
      sideBySide: true
    });

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;


    $scope.addAppointment = function (isValid) {
      console.log('ADD APPOINTMENT');
      var time = new Date();
      time.setTime(Date.parse($('#datetimepicker11').data('DateTimePicker').date()));
      var today = new Date();
      var duration = $scope.credentials.duration;
      var location = $scope.credentials.location;
	  var participant = $scope.credentials.participant;

      // Verify that date is not in the past
      if(time < today){
        $scope.error = 'Appointment can\'t be scheduled for the past!';
        return;
      }

      //Verify that there are no time conflicts
      for(var i = 0; i < $scope.appointments.length; i++){
        var startTime = new Date();
        startTime.setTime(Date.parse($scope.appointments[i].time));
        var endTime = new Date(startTime.getTime() + ($scope.appointments[i].duration*60000));
        console.log(startTime.getTime());
        console.log(endTime.getTime());
        console.log(time.getTime());
        console.log($scope.appointments[i].location);
        if ((time >= startTime) && (time < endTime)){
          console.log('Potential time conflict, checking participant and location');
          if ($scope.appointments[i].participant._id === participant){
			$scope.error = 'This participant is already scheduled at this time!';
			return;
		  }
          if (location === $scope.appointments[i].location){
            $scope.error = 'There is a time conflict at this location';
            return;
          }
        }
      }

      $scope.error = null;

      $scope.credentials.time = time; 
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');
        console.log('NOT VALID');

        return false;
      }
      console.log($scope.credentials);

      $http.post('/api/appointments', $scope.credentials).success(function (response) {
        console.log('Sucess!');
        // And redirect to the previous or list of users 
        $state.go('admin.appointments', $state.previous.params);
      }).error(function (response) {
        console.log('FAIL!');
        $scope.error = response.message;
      });
    };

  
  }
]);
