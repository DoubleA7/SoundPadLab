'use strict';

angular.module('events.admin').factory('eventsAdmin', ['$resource',
  function ($resource) {
      return $resource('api/events/:eventId', {
          eventId: '@_id'
      }, {
          update: {
              method: 'PUT'
          }
      });
  }
]);