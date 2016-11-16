'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function($scope, $http, $location, $cookies) {

    $scope.init = function() {
      // $http({
      //     url: API.getTeam,
      //     method: "GET"
      //       // skipAuthorization: true,
      //       // headers: {"Authorization": $cookies.get('token')}
      //   })
      //   .success(function(boards) {
      //     $scope.boards = boards;
      //   }).error(function(error) {
      //     console.log("error : ", error);
      //   });

      $http({
          url: API.getBoardAll,
          method: "GET"
          // headers: {"Authorization": $cookies.get('token')}
        })
        .success(function(boards) {
          console.log('board : ', boards );
          // console.log('board : ', boards.content );
          // $scope.boards = boards.content;
          $scope.boards = boards;

          // console.log(JSON.parse(boards));
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    $scope.init();
    $scope.findById = function(id){
      $location.path('/board/' + id);
    }
  });
