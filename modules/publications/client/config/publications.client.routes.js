'use strict';

// Setting up route
angular.module('publications').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('publications', {
        url: '/publications',
        templateUrl: 'modules/publications/client/views/list-publications.client.view.html',
        controller: 'PublicationListPublicController'
      })
      .state('publication', {
        url: '/publications/:publicationId',
        templateUrl: 'modules/publications/client/views/view-publication.client.view.html',
        controller: 'PublicationPublicController',
        resolve: {
          publicationResolve: ['$stateParams', 'publicationsPublic', function ($stateParams, publicationsPublic) {
            return publicationsPublic.get({
              publicationId: $stateParams.publicationId
            });
          }]
        }
      });
      
  }
]);

