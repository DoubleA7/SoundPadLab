'use strict';

angular.module('core').controller('ContactController', ['$scope', 
  function($scope) {
    $scope.openGoogleMaps = function() {
      console.log('gmaps function called');
      window.open("https://www.google.com/maps/place/University+of+Florida-+Department+of+Computer+and+Information+Science+and+Engineering/@29.6482588,-82.3456859,17z/data=!4m2!3m1!1s0x88e8a39d4f0969b5:0xd21b17bc0529867e");
    };
  }
]);