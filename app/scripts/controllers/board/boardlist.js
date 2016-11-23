'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:BoardBoardlistCtrl
 * @description
 * # BoardBoardlistCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('BoardlistCtrl', function($scope, $http, $location, $cookies, $sce) {
    $scope.content = null;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.totalCount = 0;

    $scope.init = function() {
      getBoardList($scope.currentPage);
    };
    $scope.init();
    $scope.findById = function(id) {
      $location.path('/board/' + id);
    }

    function getBoardList(page){
      $http({
          url: API.getBoardAll + "?size="+$scope.pageSize+"&page="+page,
          method: "GET"
            // headers: {"Authorization": $cookies.get('token')}
        })
        .success(function(boards) {
          console.log('board : ', boards);
          $scope.boards = boards.content;

          $scope.totalCount = boards.totalElements;
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    $scope.eventPage = function(page, pageSize, total){
      getBoardList(page-1);
    }
  });
