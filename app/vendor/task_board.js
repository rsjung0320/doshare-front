'use strict';

var TASK_BOARD = (function() {

  function task_imageUpload($http, $scope, files) {
    // 파일을 업로드 한다.
    // to-do 4mb 제한을 둔다.
    var formdata = new FormData();
    formdata.append("file", files[0]);
    $http({
        url: API.postUploadImage,
        method: API.POST,
        data: formdata,
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      })
      .success(function(name) {
        if (name !== "") {
          var path = API.getDownloadImage + name;
          $scope.editor.summernote('editor.insertImage', path, name);
        }
      }).error(function(error) {
        console.log("error : ", error);
      });
  }

  function task_uploadBoard($scope, $http, $location, path) {
    if ($scope.content !== "") {
      $http({
          url: API.postUploadBoard,
          method: API.POST,
          data: {
            title: $scope.title,
            // to-do 이러한 정보는 캐쉬 혹은 메모리에서 가지고 있도록 한다.
            email: "rsjung@nablecomm.com",
            uploadDate: new Date(),
            content: $scope.content
          }
        })
        .success(function(name) {
          $location.path(path);
        }).error(function(error) {
          console.log("error : ", error);
        });
    } else {
      // 경고창 혹은 빨간 글씨로 noti 해주기
    }
  }

  function task_uploadEditedBoard($scope, $route, $http, idx, editedContent, path) {
    $http({
        url: API.postUploadEditedBoard,
        method: API.POST,
        data: {
          idx: idx,
          updatedDate: new Date(),
          content: editedContent
        }
      })
      .success(function(name) {
         $route.reload();
      }).error(function(error) {
        console.log("error : ", error);
      });
  }

  function task_deleteBoard($location, $http, idx){
    $http({
        url: API.getDeleteBoard + idx,
        method: API.GET,
      })
      .success(function(name) {
         $location.path('/board/boardlist');
      }).error(function(error) {
        console.log("error : ", error);
      });
  }

  /*----------- TASK_BOARD Interface -----------------*/
  return {
    task_imageUpload: task_imageUpload,
    task_uploadBoard: task_uploadBoard,
    task_uploadEditedBoard: task_uploadEditedBoard,
    task_deleteBoard : task_deleteBoard
  };
  /*------------------------------------------------------*/

})(this);
