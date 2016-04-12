'use strict';

angular.module('experiments', ['nya.bootstrap.select']).controller('addExperimentController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'Admin',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, Admin) {

    Admin.query(function (data) {
      console.log(data);
      if(data.length === 0){
        $scope.error = 'No users to assign!';
      }else{
        $scope.error = null;
        $scope.users = data;
      }
    });

    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
    //$scope.credentials.requires_eyeglasses.type=false;
    
   /* handle updating the LIST of conditions per experiemnt */
    $scope.localConditions = [];
    $scope.new_condition_to_add = '';
    $scope.addLocalCondition = function() {		
      if($scope.new_condition_to_add !== '')
      {
        if($scope.localConditions.indexOf($scope.new_condition_to_add) === -1)
        {
          $scope.localConditions.push($scope.new_condition_to_add);
        }
      }  
      $scope.new_condition_to_add = '';
      
    };

    $scope.deleteLocalCondition = function(index) {
      $scope.localConditions.splice(index, 1);
    };
    
    
    $scope.addExperiment = function (isValid) {
      console.log($scope.credentials);
      if(!$scope.credentials.requires_eyeglasses) {
        $scope.credentials.requires_eyeglasses=false;
      }
      $scope.error = null;
      
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experimentForm');
        return false;
      }
      
      var temp = [];
      /*for(var i in $scope.credentials.users)
        temp.push(mongoose.Types.ObjectId($scope.credentials.users[i]));
      $scope.credentials.users = temp;*/
      // Add the updated condition list
      $scope.credentials.experiment_conditions = $scope.localConditions;
      
      
      $http.post('/api/experiments', $scope.credentials).success(function (response) {
        // And redirect to the previous or list of users 
        $state.go('admin.experiments', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };


  }
]);