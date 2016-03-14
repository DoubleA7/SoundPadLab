'use strict';

angular.module('participants').controller('addParticipantController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

	
    $scope.addParticipant = function (isValid) {
      console.log("ADD PARTICIPANT");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'participantForm');

        return false;
      }

      $http.post('/api/participants', $scope.credentials).success(function (response) {
        console.log("ADDED PARTICIPANT");
        // And redirect to the previous or list of users 
        $state.go('admin.participants', $state.previous.params);
      }).error(function (response) {
        console.log("FAILED TO ADD PARTICIPANT");
        $scope.error = response.message;
      });
    };

  
  }
]);
