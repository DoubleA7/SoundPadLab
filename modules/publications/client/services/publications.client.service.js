'use strict';

angular.module('publications').factory('publicationsPublic', ['$resource',
  function ($resource) {
    return $resource('api/publications/:publicationId', {
      publicationId: '@_id'
    });
  }
]);