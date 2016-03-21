'use strict';

// Setting up route
angular.module('events.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
      $stateProvider
        .state('admin.events', {
            url: '/events',
            templateUrl: 'modules/events/client/views/admin/list-events.client.view.html',
            controller: 'EventListController'
        })
        .state('admin.event', {
            url: '/events/:eventId',
            templateUrl: 'modules/events/client/views/admin/view-event.client.view.html',
            controller: 'EventController',
            resolve: {
                userResolve: ['$stateParams', 'eventsAdmin', function ($stateParams, eventsAdmin) {
                    return eventsAdmin.get({
                        eventId: $stateParams.eventId
                    });
                }]
            }
        })
        .state('admin.event-edit', {
            url: '/events/:eventId/edit',
            templateUrl: 'modules/events/client/views/admin/edit-event.client.view.html',
            controller: 'EventController',
            resolve: {
                userResolve: ['$stateParams', 'eventsAdmin', function ($stateParams, eventsAdmin) {
                    return eventsAdmin.get({
                        eventId: $stateParams.eventId
                    });
                }]
            }
        })
        .state('authentication.addEvent', {
            url: '/addEvent',
            templateUrl: 'modules/events/client/views/admin/add-event.client.view.html',
            data: {
                roles: ['admin']
            }
        });
  }
]);