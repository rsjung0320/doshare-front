'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:BoardBoardCtrl
 * @description
 * # BoardBoardCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('BoardCtrl', function ($scope, $http, $routeParams, $sce) {
    $scope.idx = $routeParams.idx;
    $scope.comments = null;
    $scope.hidden = true;

    $scope.init = function(){
      getBoard();
      getComment();
    }();

    $scope.edit = function(){
      console.log('text : ', $scope.textt);
      // $('#click2edit').summernote({focus: true});
      $scope.hidden = false;
      // $scope.text = '<p>hello world</p>';
    };

    $scope.save = function(){
      $scope.hidden = true;
    };

    $scope.commentShare = function(form){
      if($scope.commentContent !== "") {
        $http({
            url: API.postComment,
            method: "POST",
            data: {
              content : $scope.commentContent,
              // 이러한 정보는 캐쉬 혹은 메모리에서 가지고 있도록 한다.
              email : "rsjung@nablecomm.com",
              uploadDate : new Date(),
              board_id: $scope.idx
            }
          })
          .success(function(board) {
            $scope.commentContent = "";
            getComment();
            // $scope.reset();
            // comment 다시 불러오기
          }).error(function(error) {
            console.log("error : ", error);
          });
      }
    };

    function getBoard(){
      $http({
          url: API.getBoard + $scope.idx,
          method: "GET"
        })
        .success(function(board) {
          console.log('board : ', board );
          $scope.content = $sce.trustAsHtml(board.content);
          $scope.text = board.content;
          $scope.title = board.title;
          $scope.email = board.email;
          $scope.readCount = board.readCount;
          $scope.uploadDate = board.uploadDate;
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    function getComment(){
      $http({
          url: API.getComment + $scope.idx,
          method: "GET"
        })
        .success(function(comments) {
          $scope.comments = comments;
          console.log('comments : ', comments );
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

  });
