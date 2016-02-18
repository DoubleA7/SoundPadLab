'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('admin.home', {
        url: '',
        templateUrl: 'modules/core/client/views/admin.client.view.html'
      });
  }
]);
