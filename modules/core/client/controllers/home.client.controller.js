'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
  function ($scope, $state, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.goToContact = function() {
      $state.go('core.contact');
      //alert('Switch to contact');
    };

    $scope.goToTeam = function() {
      $state.go('core.team');
      //alert('Switch to team');
    };
    $scope.goToAbout = function(){
      $state.go('core.about');
    };
    $scope.goToAudio = function(){
      $state.go('core.audio');
    };
    $scope.goToResearch = function(){
      $state.go('core.research');
    };
    $scope.goToPublications = function(){
      $state.go('core.publications');
    };
    $scope.goToMoments = function(){
      $state.go('core.moments');
    };
  }
]);
