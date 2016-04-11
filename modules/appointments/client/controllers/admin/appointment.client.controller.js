'use strict';

angular.module('appointments.admin').controller('AppointmentController', ['$scope', '$state', 'Authentication', 'appointmentResolve', 'participantsAdmin',
  function ($scope, $state, Authentication, appointmentResolve, participantsAdmin) {
    $scope.authentication = Authentication;
    $scope.appointment = appointmentResolve;
    var j = new Date();
    j.setTime(Date.parse($scope.appointment.time));
    $scope.formattedTime = j.toLocaleString();

    console.log($state.current.name);
    
    if($state.current.name === 'admin.appointment-edit'){
      $('#datetimepicker11').datetimepicker({ });
    }

    participantsAdmin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No Participants to schedule!';
      }else{
        $scope.error = null;
        $scope.participants= data;
      }
    });

    $scope.remove = function (appointment) {
      if (confirm('Are you sure you want to delete this appointment?')) {
        if (appointment) {
          appointment.$remove();

          $scope.appointments.splice($scope.appointments.indexOf(appointment), 1);
        } else {
          $scope.appointment.$remove(function () {
            $state.go('admin.appointments');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      //$scope.credentials.time = $('#datetimepicker11').data('DateTimePicker').date();
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');

        return false;
      }

      var appointment = $scope.appointment;
      console.log(appointment);
      appointment.time = $('#datetimepicker11').data('DateTimePicker').date();
      console.log(appointment);
      //console.log($scope.credentials.time);
      //appointment.time = $scope.credentials.time;

      appointment.$update(function () {
        $state.go('admin.appointment', {
          appointmentId: appointment._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
