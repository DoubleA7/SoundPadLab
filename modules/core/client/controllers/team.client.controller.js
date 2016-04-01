'use strict';
angular.module('core').controller('TeamController', ['$scope', '$state', 'Admin',
  function ($scope, $state, Admin) {
    console.log('team list initialized!!');
    Admin.query(function (data) {
      $scope.users = data;
      console.log(JSON.stringify(data));
    });
    //console.log($scope.users);
  }
]);