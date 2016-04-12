'use strict';


angular.module('audioFiles.admin').controller('AudioFileController', ['$sce', '$http', '$window', '$timeout', '$scope', '$state', 'Authentication', 'audioFileResolve',
  function ($sce, $http, $window, $timeout, $scope, $state, Authentication, audioFileResolve) {
    $scope.authentication = Authentication;
    $scope.audioFile = audioFileResolve;
    //$scope.audioFile = audio;
    //console.log($scope.audioFile.filePath);
    var path= $scope.audioFile.filePath;
    //$scope.mp3URL = $scope.audioFile.filePath;
    console.log(path);
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

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'audioFileForm');

        return false;
      }

      var audioFile = $scope.audioFile;

      audioFile.$update(function () {
        $state.go('admin.audioFile', {
          audioFileId: audioFile._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.readFile = function(){
      var audioFile = $scope.audioFile;
      //var path = $scope.audioFile.filePath;
      //console.log($scope.path);
      console.log('before reading file' +audioFile.filePath);
      $http.post('/api/audioFiles/mp3', audioFile).success(function (response) {
        console.log("SUCCESS mp3 http post");
        $scope.mp3URL = $sce.trustAsResourceUrl(response);
        //$scope.mp3URL = response;
        //console.log(response);
      }).error(function (response) {
        console.log("FAILED TO htpp post");
        $scope.error = response.message;
      });
    };
    //$scope.readFile();

  }
]);


