'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function($scope, $http, $location) {

    $scope.init = function(){
      console.log("MainCtrl init");
      $http({
          url: "http://localhost:8080/api/v1/board/all",
          method: "GET"
        })
        .success(function(boards) {
          $scope.boards = boards;
          console.log('board : ', boards );
          // console.log(JSON.parse(boards));
        }).error(function(error) {
          console.log("error : ", error);
        });
    }

    $scope.init();
  });
