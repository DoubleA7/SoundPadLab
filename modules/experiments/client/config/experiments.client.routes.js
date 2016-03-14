'use strict';

// Setting up route
angular.module('experiments.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.experiments', {
        url: '/experiments',
        templateUrl: 'modules/experiments/client/views/admin/list-experiments.client.view.html',
        controller: 'ExperimentListController'
      })
      .state('admin.experiment', {
        url: '/experiments/:experimentId',
        templateUrl: 'modules/experiments/client/views/admin/view-experiment.client.view.html',
        controller: 'ExperimentController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              experimentId: $stateParams.experimentId
            });
          }]
        }
      })
      .state('admin.experiment-edit', {
        url: '/experiments/:experimentId/edit',
        templateUrl: 'modules/experiments/client/views/admin/edit-experiment.client.view.html',
        controller: 'ExperimentController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              experimentId: $stateParams.experimentId
            });
          }]
        }
      });
  }
]);

