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
          'Authorization': $cookies.get('token')
        },
      })
      .success(function(name) {
        console.log('name :', name);
        if (name !== '') {
          var path = API.getDownloadImage + name;
          $scope.editor.summernote('editor.insertImage', path, name);
        }
      }).error(function(error) {
        console.log('error : ', error);
      });
  }

  function uploadBoard($scope, $http, $location, $cookies, path) {
    if ($scope.content !== '') {
      $http({
          url: API.postUploadBoard,
          method: API.POST,
          data: {
            title: $scope.title,
            // to-do 이러한 정보는 캐쉬 혹은 메모리에서 가지고 있도록 한다.
            email: 'rsjung@nablecomm.com',
            uploadDate: new Date(),
            content: $scope.content
          },
          headers: {'Authorization': $cookies.get('token')},
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

  function uploadEditedBoard($scope, $route, $http, $cookies, idx, editedContent) {
    $http({
        url: API.postUploadEditedBoard,
        method: API.POST,
        data: {
          idx: idx,
          updatedDate: new Date(),
          content: editedContent
        },
        headers: {'Authorization': $cookies.get('token')},
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
        method: API.GET,
        headers: {'Authorization': $cookies.get('token')},
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
