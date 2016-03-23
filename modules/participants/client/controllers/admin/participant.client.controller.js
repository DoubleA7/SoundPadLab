'use strict';

angular.module('participants.admin').controller('ParticipantController', ['$scope', '$state', 'Authentication', 'participantResolve',
  function ($scope, $state, Authentication, participantResolve) {
    $scope.authentication = Authentication;
    $scope.participant = participantResolve;

    $scope.remove = function (participant) {
      if (confirm('Are you sure you want to delete this participant?')) {
        if (participant) {
          participant.$remove();

          $scope.participants.splice($scope.participants.indexOf(participant), 1);
        } else {
          $scope.participant.$remove(function () {
            $state.go('admin.participants');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'participantForm');

        return false;
      }

      var participant = $scope.participant;

      participant.$update(function () {
        $state.go('admin.participant', {
          participantId: participant._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
