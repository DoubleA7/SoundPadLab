'use strict';

angular.module('experiments').controller('addExperimentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
    //$scope.credentials.requires_eyeglasses.type=false;

	
    $scope.addExperiment = function (isValid) {
      if(!$scope.credentials.requires_eyeglasses) {
        $scope.credentials.requires_eyeglasses=false;
      }
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experimentForm');

        return false;
      }


      $http.post('/api/experiments', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.experiments', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

  
  }
]);