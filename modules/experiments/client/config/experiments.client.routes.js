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
          experimentResolve: ['$stateParams', 'experimentsAdmin', function ($stateParams, experimentsAdmin) {
            return experimentsAdmin.get({
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
          experimentResolve: ['$stateParams', 'experimentsAdmin', function ($stateParams, experimentsAdmin) {
            return experimentsAdmin.get({
              experimentId: $stateParams.experimentId
            });
          }]
        }
      })
      .state('authentication.addExperiment', {
        url: '/addExperiment',
        templateUrl: 'modules/experiments/client/views/admin/add-experiment.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);

