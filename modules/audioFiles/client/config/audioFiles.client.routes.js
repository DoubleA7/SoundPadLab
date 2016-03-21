'use strict';

// Setting up route
angular.module('audioFiles.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.audioFiles', {
        url: '/audioFiles',
        templateUrl: 'modules/audioFiles/client/views/admin/list-audioFiles.client.view.html',
        controller: 'AudioFileController'
      })
      .state('admin.audioFile', {
        url: '/audioFiles/:audioFileId',
        templateUrl: 'modules/audioFiles/client/views/admin/view-audioFile.client.view.html',
        controller: 'AudioFileController',
        resolve: {
          audioFileResolve: ['$stateParams', 'audioFilesAdmin', function ($stateParams, audioFilesAdmin) {
            return audioFilesAdmin.get({
              audioFileId: $stateParams.audioFileId
            });
          }]
        }
      })
      .state('admin.audioFile-edit', {
        url: '/audioFiles/:audioFileId/edit',
        templateUrl: 'modules/audioFiles/client/views/admin/edit-audioFile.client.view.html',
        controller: 'AudioFileController',
        resolve: {
          audioFileResolve: ['$stateParams', 'audioFilesAdmin', function ($stateParams, audioFilesAdmin) {
            return audioFilesAdmin.get({
              audioFileId: $stateParams.audioFileId
            });
          }]
        }
      })
      .state('authentication.addAudioFile', {
        url: '/addAudioFile',
        templateUrl: 'modules/audioFiles/client/views/admin/add-audioFile.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);

