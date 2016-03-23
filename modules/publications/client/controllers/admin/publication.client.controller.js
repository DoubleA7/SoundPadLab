'use strict';

angular.module('publications.admin').controller('PublicationController', ['$scope', '$state', 'Authentication', 'publicationResolve',
  function ($scope, $state, Authentication, publicationResolve) {
    $scope.authentication = Authentication;
    $scope.publication = publicationResolve;

    $scope.remove = function (publication) {
      if (confirm('Are you sure you want to delete this publication?')) {
        if (publication) {
          publication.$remove();

          $scope.publications.splice($scope.publications.indexOf(publication), 1);
        } else {
          $scope.publication.$remove(function () {
            $state.go('admin.publications');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'publicationForm');

        return false;
      }

      var publication = $scope.publication;

      publication.$update(function () {
        $state.go('admin.publication', {
          publicationId: publication._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
