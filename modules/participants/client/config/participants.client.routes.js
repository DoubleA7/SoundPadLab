'use strict';

// Setting up route
angular.module('participants.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.participants', {
        url: '/participants',
        templateUrl: 'modules/participants/client/views/admin/list-participants.client.view.html',
        controller: 'ParticipantListController'
      })
      .state('admin.participant', {
        url: '/participants/:participantId',
        templateUrl: 'modules/participants/client/views/admin/view-participant.client.view.html',
        controller: 'ParticipantController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              participantId: $stateParams.participantId
            });
          }]
        }
      })
      .state('admin.participant-edit', {
        url: '/participants/:participantId/edit',
        templateUrl: 'modules/participants/client/views/admin/edit-participant.client.view.html',
        controller: 'ParticipantController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              participantId: $stateParams.participantId
            });
          }]
        }
      });
  }
]);

