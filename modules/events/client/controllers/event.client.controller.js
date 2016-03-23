'use strict';

angular.module('events').controller('EventPublicController', ['$scope', '$state', 'eventResolve',
  function ($scope, $state, eventResolve) {
    $scope.event = eventResolve;
  }
]);
