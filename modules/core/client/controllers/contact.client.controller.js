'use strict';

angular.module('core').controller('ContactController', ['$scope', '$uibModal', '$log',
  function($scope, $uibModal, $log) {

    $scope.subject = 'subject';

    $scope.openGoogleMaps = function() {
      console.log('gmaps function called');
      window.open("https://www.google.com/maps/place/University+of+Florida-+Department+of+Computer+and+Information+Science+and+Engineering/@29.6482588,-82.3456859,17z/data=!4m2!3m1!1s0x88e8a39d4f0969b5:0xd21b17bc0529867e");
    };

    $scope.modalEmail = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/modules/core/client/views/email-form.client.view.html',
        controller: 'EmailFormController',
        size: size,
        resolve: {
          subject: function () {
            return $scope.subject;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
]);