'use strict';

angular.module('core').controller('ContactController', ['$scope', '$http',
  function($scope, $http) {

    $scope.name = 'Your name here';
    $scope.email = 'Your e-mail address';
    $scope.verifyEmail = 'test2';
    $scope.msg = 'Additional Information';

    var data = ({
      name : $scope.name,
      email : $scope.email,
      msg : $scope.msg
    });

    $scope.openGoogleMaps = function() {
      console.log('gmaps function called');
      window.open("https://www.google.com/maps/place/University+of+Florida-+Department+of+Computer+and+Information+Science+and+Engineering/@29.6482588,-82.3456859,17z/data=!4m2!3m1!1s0x88e8a39d4f0969b5:0xd21b17bc0529867e");
    };

    $scope.sendMail = function () {
      $http({
        method: 'POST',
        url: '/postMail', 
        data: data
      }).then(function successCallback(response) {

      }, function errorCallback(response) {

      });
    };
  }
]);