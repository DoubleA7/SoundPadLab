'use strict';

angular.module('publications.admin').factory('publicationsAdmin', ['$resource',
  function ($resource) {
    return $resource('api/publications/:publicationId', {
      publicationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);