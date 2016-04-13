'use strict';

angular.module('experiments.admin').factory('experimentsAdmin', ['$resource',
  function ($resource) {
    return $resource('api/experiments/:experimentId', {
      experimentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);