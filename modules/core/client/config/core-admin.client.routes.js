'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        views: {
          '': {
            templateUrl: 'modules/core/client/views/core.client.view.html',
            controller: 'CoreController'
          }
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('admin.home', {
        url: '',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
        controller: 'AdminController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/client/views/home.client.view.html'
      });
  }
]);
