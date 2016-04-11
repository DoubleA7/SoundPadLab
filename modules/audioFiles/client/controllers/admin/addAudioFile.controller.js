'use strict';

angular.module('audioFiles.admin').controller('addAudioFileController', ['$scope', '$timeout', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'FileUploader',
  function ($scope, $timeout, $state, $http, $location, $window, Authentication, PasswordValidator, FileUploader) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();
    $scope.title = 'TESTt';
    //$scope.audioFile = audioFileResolve;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/audioFiles/upload',
      alias: 'mp3File'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'mp3Filter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|mp3|'.indexOf(type) !== -1;
      }
    });


     // Called after the user has successfully uploaded mp3
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.title = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();
      console.log('upload error' + response.message);
      // Show error message
      $scope.error = response.message;
    };

    // Called after the user selected a new picture file
    /*$scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
           // $scope.mp3URL = fileReaderEvent.target.result;
            console.log(fileReaderEvent.target.result)
          }, 0);
        };
      }
    };*/

    // Change user profile picture
    $scope.uploadMp3File = function (req,res) {
      // Clear messages
      $scope.success = $scope.error = null;
      console.log('inside uploadMp3File');
      // Start upload
      $scope.uploader.uploadAll();
      console.log(res);
      console.log(JSON.stringify($scope.credentials) + 'inside uploadmp3 function');
      //$scope.credentials.ti = 
      //addAudioFile();

    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();

    };
	
    $scope.addAudioFile = function (isValid) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'audioForm');

        return false;
      }
      /*$http.post('/api/audioFiles/', $scope.credentials).success(function (response) {
          console.log('success');
      }).error(function (response) {
        console.log("FAILED TO ADD AUDIO FILE");
        $scope.error = response.message;
      });*/
      $scope.uploadMp3File();

      $http.post('/api/audioFiles/', $scope.credentials).success(function (response) {
        console.log("ADDED AUDIO FILE");
        console.log(response);
        //$scope.uploadMp3File();
        // And redirect to the previous or list of users 
        $state.go('admin.audioFiles', $state.previous.params);
      }).error(function (response) {
        console.log("FAILED TO ADD AUDIO FILE");
        $scope.error = response.message;
        return;
      });
      console.log("ADD AUDIO FILE");

    };

  
  }
]);
