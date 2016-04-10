'use strict';

angular.module('events').controller('addEventController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;


    $scope.addEvent = function (isValid) {
      console.log('ADD EVENT');
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'eventForm');

        return false;
      }

      $http.post('/api/events', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.events', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };


  }
]);