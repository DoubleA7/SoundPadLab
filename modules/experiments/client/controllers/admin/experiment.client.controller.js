'use strict';

angular.module('experiments.admin').controller('ExperimentController', ['$scope', '$state', 'Authentication', 'experimentResolve',
  function ($scope, $state, Authentication, experimentResolve) {
    $scope.authentication = Authentication;
    $scope.experiment = experimentResolve;
    
    
     /* handle updating the LIST of conditions per experiemnt */
     var pristine_conditions = angular.copy($scope.experiment.experiment_conditions);
     console.log("tried to get pristine conditions");
     console.log(angular.copy($scope.experiment));
     
    $scope.localConditions = angular.copy(pristine_conditions);
    $scope.new_condition_to_add = "";
    $scope.resetLocalConditions = function() {      
      $scope.localConditions = angular.copy(pristine_conditions);
      console.log("hi", $scope.localConditions);
      console.log("hihi",pristine_conditions);
    }
    $scope.addLocalCondition = function() {		
      if(!($scope.new_condition_to_add === ""))
        $scope.localConditions.push($scope.new_condition_to_add);
      $scope.new_condition_to_add = "";
      
    };

    $scope.deleteLocalCondition = function(index) {
      $scope.localConditions.splice(index, 1);
    };

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
      
      /* Set the conditions array */
      $scope.experiment.experiment_conditions = angular.copy($scope.localConditions);
      var experiment = $scope.experiment;

      experiment.$update(function () {
        $state.go('admin.experiment', {
          experimentId: experiment._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.resetLocalConditions();
  }
]);
