'use strict';

// Setting up route
angular.module('events').config(['$stateProvider',
  function ($stateProvider) {
      $stateProvider
        .state('events', {
            url: '/events',
            templateUrl: 'modules/events/client/views/list-events.client.view.html',
            controller: 'EventListPublicController'
        })
        .state('event', {
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
        });
  }
]);