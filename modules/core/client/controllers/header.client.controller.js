'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    console.log("Start Header controller");
    // Expose view variables
    $scope.showHeader = false;
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    console.log($scope.authentication);
    var user_roles = $scope.authentication.user.roles;
    //check if admin is signed in
    if(!user_roles){
      console.log('no user roles found');
      $scope.showHeader = false;
    }
    else if (user_roles.indexOf('admin') > -1) {
      $scope.showHeader = true;
      alert('Header set to TRUE inside HeaderController');
    } else {
      $scope.showHeader = false;
      alert('Header set to FALSE inside HeaderController');
    }
  }
]);
