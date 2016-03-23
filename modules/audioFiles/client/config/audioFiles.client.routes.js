'use strict';

// Setting up route
angular.module('audioFiles').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('audioFiles', {
        url: '/audioFiles',
        templateUrl: 'modules/audioFiles/client/views/list-audioFiles.client.view.html',
        controller: 'AudioFileListPublicController'
      })
      .state('audioFile', {
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
      });
  }
]);

