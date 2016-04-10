'use strict';
angular.module('core').controller('TeamController', ['$scope', '$state', 'Members',
  function ($scope, $state, Members) {
    console.log('team list initialized!!');
    Members.query(function (data) {
      $scope.members = data;
      console.log(JSON.stringify(data));
      alert('Stringify data \n' + JSON.stringify(data));
      alert('Raw data \n' + data);
    });
  }
]);