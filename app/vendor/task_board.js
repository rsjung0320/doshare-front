var TASK_BOARD = (function() {
  'use strict';

  function imageUpload($http, $scope, $cookies, files) {
    // 파일을 업로드 한다.
    // to-do 4mb 제한을 둔다.
    var formdata = new FormData();
    formdata.append('file', files[0]);
    $http({
        url: API.postUploadImage,
        method: API.POST,
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          // 'Authorization': $cookies.get('token')
        },
      })
      .success(function(data) {
        console.log('data :', data);
        if (data.message !== '') {
          var name = data.message;
          var path = API.getDownloadImage + name;
          $scope.editor.summernote('editor.insertImage', path, name);
        }
      }).error(function(data) {
        console.log('data : ', data);
      });
  }

  function uploadBoard($scope, $http, $location, $cookies, path, tags) {
    console.log('tags :', tags);
    var userInfo = angular.fromJson($cookies.get('userInfo'));
    if ($scope.content !== '') {
      $http({
          url: API.postUploadBoard,
          method: API.POST,
          data: {
            title: $scope.title,
            email: userInfo.email,
            content: $scope.content,
            userIdx: userInfo.idx,
            tags: tags
          }
          // ,
          // headers: {'Authorization': $cookies.get('token')},
        })
        .success(function(data) {
          console.log('data : ', data);
          $location.path(path);
        }).error(function(error) {
          console.log('error : ', error);
        });
    } else {
      // 경고창 혹은 빨간 글씨로 noti 해주기
    }
  }

  function uploadEditedBoard($scope, $route, $http, $cookies, idx, title, editedContent) {
    $http({
        url: API.postUploadEditedBoard + idx,
        method: API.POST,
        data: {
          title: title,
          content: editedContent
        }
        // ,
        // headers: {'Authorization': $cookies.get('token')},
      })
      .success(function(success) {
        console.log('success : ', success);
        $route.reload();
      }).error(function(error) {
        console.log('error : ', error);
      });
  }

  function deleteBoard($location, $http, $cookies, idx) {
    $http({
        url: API.getDeleteBoard + idx,
        method: API.GET
        // ,
        // headers: {'Authorization': $cookies.get('token')},
      })
      .success(function(success) {
        console.log('success : ', success);
        $location.path('/board/boardlist');
      }).error(function(error) {
        console.log('error : ', error);
      });
  }

  /*----------- TASK_BOARD Interface -----------------*/
  return {
    imageUpload: imageUpload,
    uploadBoard: uploadBoard,
    uploadEditedBoard: uploadEditedBoard,
    deleteBoard: deleteBoard
  };
  /*------------------------------------------------------*/

})(TASK_BOARD);
