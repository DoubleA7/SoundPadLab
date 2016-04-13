'use strict';


angular.module('audioFiles.admin').controller('AudioFileController', ['$sce', '$http', '$window', '$timeout', '$scope', '$state', 'Authentication', 'audioFileResolve',
  function ($sce, $http, $window, $timeout, $scope, $state, Authentication, audioFileResolve) {
    $scope.authentication = Authentication;
    $scope.audioFile = audioFileResolve;
    $scope.remove = function (audioFile) {
      if (confirm('Are you sure you want to delete this audioFile?')) {
        if (audioFile) {
          audioFile.$remove();

          $scope.audioFiles.splice($scope.audioFiles.indexOf(audioFile), 1);
        } else {
          $scope.audioFile.$remove(function () {
            $state.go('admin.audioFiles');
          });
        }
      }
    };

    $scope.readFile = function(){
      var audioFile = $scope.audioFile;
      audioFile.$promise.then(function(response){
        $scope.path = response;
        console.log(response);
        $http.post('/api/audioFiles/mp3', response).success(function (response) {
          console.log("SUCCESS mp3 http post");
          $scope.mp3URL = $sce.trustAsResourceUrl(response);
          }).error(function (response) {
          console.log("FAILED TO htpp post");
          $scope.error = response.message;
        });
      });
    };
  }
]);


