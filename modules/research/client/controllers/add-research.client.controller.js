'use strict';

angular.module('research').controller('addResearchController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
      $scope.authentication = Authentication;
      $scope.popoverMsg = PasswordValidator.getPopoverMsg();

      // Get an eventual error defined in the URL query string:
      $scope.error = $location.search().err;


      $scope.addResearch = function (isValid) {
          console.log("ADD RESEARCH");
          $scope.error = null;

          if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'researchForm');

              return false;
          }

          $http.post('/api/research', $scope.credentials).success(function (response) {
              // And redirect to the previous or list of research
              $state.go('admin.researchs', $state.previous.params);
              
          }).error(function (response) {
              $scope.error = response.message;
          });
      };


  }
]);