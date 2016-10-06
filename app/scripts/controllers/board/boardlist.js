'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:BoardBoardlistCtrl
 * @description
 * # BoardBoardlistCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('BoardlistCtrl', function ($scope, $http, $location, $cookies) {
    $scope.init = function(){
      console.log('BoardlistCtrl init');
      $http({
          url: API.getBoardAll,
          method: "GET",
          headers: {"Authorization": $cookies.get('token')}
        })
        .success(function(boards) {
          $scope.boards = boards;
          console.log('board : ', boards );
          // console.log(JSON.parse(boards));
        }).error(function(error) {
          console.log("error : ", error);
        });
    };
    $scope.init();
    $scope.findById = function(id){
      $location.path('/board/' + id);
    }
  });
