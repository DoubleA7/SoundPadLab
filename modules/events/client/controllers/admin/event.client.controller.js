'use strict';

angular.module('events.admin').controller('EventController', ['$scope', '$state', 'Authentication', 'eventResolve',
  function ($scope, $state, Authentication, eventResolve) {
    $scope.authentication = Authentication;
    $scope.event = eventResolve;
    var da = new Date($scope.event.created_at)
    $scope.event.created_at = da.toDateString();

    $scope.remove = function (event) {
      if (confirm('Are you sure you want to delete this event?')) {
        if (event) {
          event.$remove();

          $scope.events.splice($scope.events.indexOf(event), 1);
        } else {
          $scope.event.$remove(function () {
            $state.go('admin.events');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'eventForm');

        return false;
      }

      var event = $scope.event;

      event.$update(function () {
        $state.go('admin.event', {
          eventId: event._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
