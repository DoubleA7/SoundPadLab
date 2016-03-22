'use strict';

angular.module('publications').controller('addPublicationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
      $scope.authentication = Authentication;
      $scope.popoverMsg = PasswordValidator.getPopoverMsg();

      // Get an eventual error defined in the URL query string:
      $scope.error = $location.search().err;


      $scope.addPublication = function (isValid) {
          console.log("ADD publication");
          $scope.error = null;

          if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'publicationForm');
            
              return false;
          }

          $http.post('/api/publications', $scope.credentials).success(function (response) {
              // And redirect to the previous or list of users 
             // console.log("error");
              $state.go('admin.publications', $state.previous.params);
          }).error(function (response) {
              $scope.error = response.message;
             // console.log("error");
          });
      };


  }
]);