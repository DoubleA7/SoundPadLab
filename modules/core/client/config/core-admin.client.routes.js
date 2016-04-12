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
      .state('admin.publications', {
        url: '/publications',
        templateUrl: 'modules/publications/client/views/list-publications.client.view.html',
        controller: 'PublicationListPublicController'
      })
      .state('admin.publication', {
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
      .state('admin.publication-edit', {
        url: '/publications/:publicationId/edit',
        templateUrl: 'modules/publications/client/views/admin/edit-publication.client.view.html',
        controller: 'PublicationController',
        resolve: {
          publicationResolve: ['$stateParams', 'publicationsAdmin', function ($stateParams, publicationsAdmin) {
            return publicationsAdmin.get({
              publicationId: $stateParams.publicationId
            });
          }]
        }
      })
      .state('admin.appointments', {
        url: '/appointments',
        templateUrl: 'modules/appointments/client/views/admin/list-appointments.client.view.html',
        controller: 'AppointmentListController'
      })
      .state('admin.appointment', {
        url: '/appointments/:appointmentId',
        templateUrl: 'modules/appointments/client/views/admin/view-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentAdmin', function ($stateParams, appointmentAdmin) {
            return appointmentAdmin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-edit', {
        url: '/appointments/:appointmentId/edit',
        templateUrl: 'modules/appointments/client/views/admin/edit-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentAdmin', function ($stateParams, appointmentAdmin) {
            return appointmentAdmin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-add', {
        url: '/addAppointment',
        controller: 'addAppointmentController',
        templateUrl: 'modules/appointments/client/views/admin/add-appointment.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
