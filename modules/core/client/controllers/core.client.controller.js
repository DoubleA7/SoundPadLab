'use strict';

angular.module('core').controller('CoreController', ['$scope', '$state',
  function ($scope, $state) {
    $scope.showHeader = true;
    $scope.$state = $state;
    console.log('Inside core controller');
    //console.log($scope);
    $scope.init = function() {
    };
    $scope.goToContact = function() {
      $state.go('core.contact');
    };
    $scope.goToTeam = function() {
      $state.go('core.team');
    };
    $scope.goToAbout = function(){
      $state.go('core.about');
    };
    $scope.goToAudio = function(){
      $state.go('core.audioFiles');
    };
    $scope.goToResearch = function(){
      $state.go('core.researchs');
    };
    $scope.goToPublications = function(){
      $state.go('core.publications');
    };
    $scope.goToEvents = function(){
      $state.go('core.events');
    };
  }
]);
