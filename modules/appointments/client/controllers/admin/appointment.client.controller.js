'use strict';

angular.module('appointments.admin').controller('AppointmentController', ['$scope', '$state', 'Authentication', 'appointmentResolve',
  function ($scope, $state, Authentication, appointmentResolve) {
    $scope.authentication = Authentication;
    $scope.appointment = appointmentResolve;

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
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'appointmentForm');

        return false;
      }

      var appointment = $scope.appointment;

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
