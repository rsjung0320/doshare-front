'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AboutCtrl', function($scope, $http, $httpParamSerializerJQLike, $location) {

    $scope.content = "";

    $('#summernote').summernote({
      height : 350,
      onImageUpload : function(files, editor, welEditable) {
        console.log('onImageUpload : ', files[0]);
          // sendFile(files[0], editor, welEditable);
      }
    });

    // console.log('Summernote is launched');
    $scope.init = function() {

    }();

    $scope.change = function(contents) {
      $scope.content = contents;
      // console.log('contents are changed:', contents, $scope.editable);
    };
    $scope.imageUpload = function(files) {
      task_imageUpload(files);
    }

    function task_imageUpload(files){
      // 파일을 업로드 한다.
      // to-do 4mb 제한을 둔다.
      var formdata = new FormData();
      formdata.append("file", files[0]);
      console.log('file :', files[0]);
      $http({
          url: API.postUploadImage,
          method: "POST",
          data: formdata,
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        })
        .success(function(name) {
          console.log(name);
          if (name !== "") {
            var path = API.getDownloadImage + name;
            $scope.editor.summernote('editor.insertImage', path, name);
          }
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    $scope.uploadBoard = function() {
      task_uploadBoard();
    }

    function task_uploadBoard() {
      console.log("uploadBoard : ", $scope.content);

      if($scope.content !== ""){
        $http({
            url: API.postUploadBoard,
            method: "POST",
            data: {
              title : $scope.title,
              // 이러한 정보는 캐쉬 혹은 메모리에서 가지고 있도록 한다.
              email : "rsjung@nablecomm.com",
              uploadDate : new Date(),
              content : $scope.content
            }
          })
          .success(function(name) {
            $location.path('/board/boardlist');
            console.log(name);
          }).error(function(error) {
            console.log("error : ", error);
          });
      } else {
        // 경고창 혹은 빨간 글씨로 noti 해주기
      }
    }
  });
