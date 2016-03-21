'use strict';

angular.module('research.admin').factory('researchAdmin', ['$resource',
  function ($resource) {
      return $resource('api/research/:researchId', {
          eventId: '@_id'
      }, {
          update: {
              method: 'PUT'
          }
      });
  }
]);