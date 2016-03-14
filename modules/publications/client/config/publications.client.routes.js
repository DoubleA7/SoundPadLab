'use strict';

// Setting up route
angular.module('publications.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.publications', {
        url: '/publications',
        templateUrl: 'modules/publications/client/views/admin/list-publications.client.view.html',
        controller: 'PublicationListController'
      })
      .state('admin.publication', {
        url: '/publications/:publicationId',
        templateUrl: 'modules/publications/client/views/admin/view-publication.client.view.html',
        controller: 'PublicationController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              publicationId: $stateParams.publicationId
            });
          }]
        }
      })
      .state('admin.publication-edit', {
        url: '/publications/:publicationId/edit',
        templateUrl: 'modules/publications/client/views/admin/edit-publication.client.view.html',
        controller: 'PublicationController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              publicationId: $stateParams.publicationId
            });
          }]
        }
      });
  }
]);

