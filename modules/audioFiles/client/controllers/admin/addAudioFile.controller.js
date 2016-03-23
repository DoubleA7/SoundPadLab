'use strict';

angular.module('audioFiles.admin').controller('addAudioFileController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

	
    $scope.addAudioFile = function (isValid) {
      console.log("ADD AUDIO FILE");
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'audioForm');

        return false;
      }

      $http.post('/api/audioFiles', $scope.credentials).success(function (response) {
        console.log("ADDED AUDIO FILE");
        // And redirect to the previous or list of users 
        $state.go('admin.audioFiles', $state.previous.params);
      }).error(function (response) {
        console.log("FAILED TO ADD AUDIO FILE");
        $scope.error = response.message;
      });
    };

  
  }
]);
