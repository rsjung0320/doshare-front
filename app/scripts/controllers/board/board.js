'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:BoardBoardCtrl
 * @description
 * # BoardBoardCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('BoardCtrl', function ($scope, $route, $http, $location, $routeParams, $sce, $cookies) {
    $scope.idx = $routeParams.idx;
    $scope.comments = null;
    $scope.hidden = true;
    $scope.isAuthor = false;
    $scope.editedContent = "";
    $scope.tags = null;

    $scope.init = function(){
      getBoard();
      // getComment();
    }();

    $scope.edit = function(){
      $scope.hidden = false;
    };

    $scope.delete = function(){
      TASK_BOARD.deleteBoard($location, $http, $cookies, $scope.idx);
    };

    $scope.save = function(){
      $scope.hidden = true;
      // var path = '/board/' + $scope.idx;
      TASK_BOARD.uploadEditedBoard($scope, $route, $http, $cookies, $scope.idx, $scope.title, $scope.text);
    };

    $scope.imageUpload = function(files) {
      TASK_BOARD.imageUpload($http, $scope, $cookies, files);
    };

    // comment를 저장한다.
    $scope.commentShare = function(form){
      var userInfo = angular.fromJson($cookies.get('userInfo'));
      if($scope.commentContent !== "") {
        $http({
            url: API.postComment + $scope.idx,
            method: "POST",
            data: {
              content : $scope.commentContent,
              email : userInfo.email
            }
          })
          .success(function(data, status, headers, config) {
            $scope.commentContent = "";
            getComment();
            // $scope.reset();
            // comment 다시 불러오기
          }).error(function(data, status, headers, config) {
            console.log("data : ", data);
            console.log("status : ", status);
            console.log("headers : ", headers);
            console.log("config : ", config);
          });
      }
    };

    function getBoard(){
      $http({
          url: API.getBoard + $scope.idx,
          method: "GET"
          // ,
          // headers: {"Authorization": $cookies.get('token')}
        })
        .success(function(board) {
          console.log('board : ', board );
          $scope.content = $sce.trustAsHtml(board.content);
          $scope.text = board.content;
          $scope.title = board.title;
          $scope.email = board.email;
          $scope.readCount = board.readCount;
          $scope.uploadDate = board.uploadDate;
          $scope.tags = board.tags;
          $scope.comments = board.comments;

          setIsAuthor(board.email);

        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    function getComment(){
      $http({
          url: API.getComment + $scope.idx,
          method: "GET"
          // ,
          // headers: {"Authorization": $cookies.get('token')}
        })
        .success(function(comments) {
          $scope.comments = comments;
          console.log('comments : ', comments );
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    function setIsAuthor(email){
      var userInfo = angular.fromJson($cookies.get('userInfo'));
      if(email === userInfo.email){
        $scope.isAuthor = true;
      }
    }
  });
