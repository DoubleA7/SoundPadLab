'use strict';

angular.module('audioFiles.admin').factory('audioFileAdmin', ['$resource',
  function ($resource) {
    return $resource('api/audioFiles/:audioFileId', {
        eventId: '@_id'
      }, {
        update: {
            method: 'PUT'
          }
      });
  }
]);
