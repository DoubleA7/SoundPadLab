'use strict';

angular.module('research.admin').controller('ResearchController', ['$scope', '$state', 'Authentication', 'researchResolve',
  function ($scope, $state, Authentication, researchResolve) {
    $scope.authentication = Authentication;
    $scope.research = researchResolve;

    $scope.remove = function (research) {
        if (confirm('Are you sure you want to delete this research?')) {
            if (research) {
                research.$remove();

                $scope.research.splice($scope.research.indexOf(research), 1);
        } else {
                $scope.research.$remove(function () {
                    $state.go('admin.research');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'researchForm');

        return false;
      }

      var research = $scope.research;

      research.$update(function () {
          $state.go('admin.research', {
              researchId: research._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
