'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('core', {
        abstract: true,
        template: '<ui-view/>',
        views: {
          '': {
            templateUrl: 'modules/core/client/views/core.client.view.html',
            controller: 'CoreController'
          }
        }
      })
    .state('core.home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('core.about', {
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html',
      controller: 'AboutController'
    })
    .state('core.contact', {
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html',
      controller: 'ContactController'
    })
    .state('core.team', {
      url: '/team',
      templateUrl: 'modules/core/client/views/team.client.view.html',
      controller: 'TeamController'
    })
    .state('core.audioFiles', {
      url: '/audioFiles',
      templateUrl: 'modules/audioFiles/client/views/list-audioFiles.client.view.html',
      controller: 'AudioFileListPublicController'
    })
    .state('core.audioFile', {
      url: '/audioFiles/:audioFileId',
      templateUrl: 'modules/audioFiles/client/views/view-audioFile.client.view.html',
      controller: 'AudioFilePublicController',
      resolve: {
      audioFileResolve: ['$stateParams', 'audioFilePublic', function ($stateParams, audioFilePublic) {
        return audioFilePublic.get({
          audioFileId: $stateParams.audioFileId
            });
          }]
        }
      })
    .state('core.researchs', {
      url: '/research',
      templateUrl: 'modules/research/client/views/list-research.client.view.html',
      controller: 'ResearchListPublicController'
    })
    .state('core.research', {
      url: '/research/:researchId',
      templateUrl: 'modules/research/client/views/view-research.client.view.html',
      controller: 'ResearchPublicController',
      resolve: {
        researchResolve: ['$stateParams', 'researchPublic', function ($stateParams, researchPublic) {
          return researchPublic.get({
            researchId: $stateParams.researchId
          });
        }]
      }
    })
      .state('core.publications', {
        url: '/publications',
        templateUrl: 'modules/publications/client/views/list-publications.client.view.html',
        controller: 'PublicationListPublicController'
      })
      .state('core.publication', {
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
      })
    .state('core.events', {
      url: '/events',
      templateUrl: 'modules/events/client/views/list-events.client.view.html',
      controller: 'EventListPublicController'
    })
    .state('core.event', {
      url: '/events/:eventId',
      templateUrl: 'modules/events/client/views/view-event.client.view.html',
      controller: 'EventPublicController',
      resolve: {
        eventResolve: ['$stateParams', 'eventsPublic', function ($stateParams, eventsPublic) {
          return eventsPublic.get({
            eventId: $stateParams.eventId
          });
        }]
      }
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
