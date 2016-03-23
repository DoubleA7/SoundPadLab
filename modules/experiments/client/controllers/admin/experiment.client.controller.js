'use strict';

angular.module('experiments.admin').controller('ExperimentController', ['$scope', '$state', 'Authentication', 'experimentResolve',
  function ($scope, $state, Authentication, experimentResolve) {
    $scope.authentication = Authentication;
    $scope.experiment = experimentResolve;

    $scope.remove = function (experiment) {
      if (confirm('Are you sure you want to delete this experiment?')) {
        if (experiment) {
          experiment.$remove();

          $scope.experiments.splice($scope.experiments.indexOf(experiment), 1);
        } else {
          $scope.experiment.$remove(function () {
            $state.go('admin.experiments');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experimentForm');

        return false;
      }

      var experiment = $scope.experiment;

      experiment.$update(function () {
        $state.go('admin.experiment', {
          experimentId: experiment._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
