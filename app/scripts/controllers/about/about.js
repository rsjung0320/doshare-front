'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AboutCtrl', function($scope, $http, $httpParamSerializerJQLike) {

    $scope.content = "";

    // console.log('Summernote is launched');
    $scope.init = function() {}

    $scope.change = function(contents) {
      $scope.content = contents;
      // console.log('contents are changed:', contents, $scope.editable);
    };
    $scope.imageUpload = function(files) {
      // 파일을 업로드 한다.
      // to-do 4mb 제한을 둔다.
      var formdata = new FormData();
      formdata.append("file", files[0]);
      $http({
          url: "http://localhost:8080/api/v1/board/upload/image",
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
            var path = "http://localhost:8080/api/v1/board/download/" + name;
            $scope.editor.summernote('editor.insertImage', path, name);
          }
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    $scope.uploadBoard = function() {
      console.log("uploadBoard : ", $scope.content);

      if($scope.content !== ""){
        $http({
            url: "http://localhost:8080/api/v1/board/upload/board",
            method: "POST",
            data: {
              title : "세상의 끝에서",
              // 이러한 정보는 캐쉬 혹은 메모리에서 가지고 있도록 한다.
              email : "rsjung@nablecomm.com",
              uploadDate : new Date(),
              content : $scope.content
            }
          })
          .success(function(name) {
            console.log(name);
          }).error(function(error) {
            console.log("error : ", error);
          });
      } else {
        // 경고창 혹은 빨간 글씨로 noti 해주기
      }

    }
  });
