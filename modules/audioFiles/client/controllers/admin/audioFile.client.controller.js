'use strict';


angular.module('audioFiles.admin').controller('AudioFileController', ['fs','$scope', '$state', 'Authentication', 'audioFileResolve',
  function (fs,$scope, $state, Authentication, audioFileResolve) {
    $scope.authentication = Authentication;
    $scope.audioFile = audioFileResolve;
    console.log($scope.audioFile.filePath);
    $scope.mp3URL = $scope.audioFile.filePath;
    console.log($scope.mp3URL);
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

  }
]);


