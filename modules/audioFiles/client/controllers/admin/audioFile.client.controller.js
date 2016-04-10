'use strict';


angular.module('audioFiles.admin').controller('AudioFileController', ['$window', '$timeout', '$scope', '$state', 'Authentication', 'audioFileResolve',
  function ($window, $timeout, $scope, $state, Authentication, audioFileResolve) {
    $scope.authentication = Authentication;
    $scope.audioFile = audioFileResolve;
    //$scope.audioFile = audio;
    //console.log($scope.audioFile.filePath);
    $scope.path = $scope.audioFile.filePath;
    //$scope.mp3URL = $scope.audioFile.filePath;
    console.log($scope.path);
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

      //var fileReader = new $window.FileReader();
        var file = new File([""],$scope.path);
        console.log(file);
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.x = fileReaderEvent.target.result;
            console.log($scope.x);
          }, 0);
        };
      

    };
    $scope.readFile();

  }
]);


