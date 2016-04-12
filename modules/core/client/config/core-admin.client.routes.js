'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', { //Abstract state that is used to hold all other views
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
      .state('admin.home', { //Page just after admin logs in
        url: '',
        templateUrl: 'modules/core/client/views/admin/admin.client.view.html',
        controller: 'AdminController'
      })
      .state('admin.appointments', { //List view of all appointments
        url: '/appointments',
        templateUrl: 'modules/appointments/client/views/admin/list-appointments.client.view.html',
        controller: 'AppointmentListController'
      })
      .state('admin.appointment', { //Appointment detail view
        url: '/appointments/:appointmentId',
        templateUrl: 'modules/appointments/client/views/admin/view-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentAdmin', function ($stateParams, appointmentAdmin) { //Resolve that gets appointment by ID
            return appointmentAdmin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-edit', { //View for admins to change appointment properties
        url: '/appointments/:appointmentId/edit',
        templateUrl: 'modules/appointments/client/views/admin/edit-appointment.client.view.html',
        controller: 'AppointmentController',
        resolve: {
          appointmentResolve: ['$stateParams', 'appointmentAdmin', function ($stateParams, appointmentAdmin) { //Resolve that gets appointment by ID
            return appointmentAdmin.get({
              appointmentId: $stateParams.appointmentId
            });
          }]
        }
      })
      .state('admin.appointment-add', { //View for admins to create brand new appointment
        url: '/addAppointment',
        controller: 'addAppointmentController',
        templateUrl: 'modules/appointments/client/views/admin/add-appointment.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
