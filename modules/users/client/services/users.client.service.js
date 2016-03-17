'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    console.log("USER ADMIN 1");
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    console.log("USER ADMIN 2");
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('participants.admin').factory('participantsAdmin', ['$resource',
  function ($resource) {
    console.log("part ADMIN 2");
    return $resource('api/participants/:participantId', {
      participantId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('experiments.admin').factory('experimentsAdmin', ['$resource',
  function ($resource) {
    console.log("experiments admin");
    return $resource('api/experiments/:experimentId', {
      experimentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
