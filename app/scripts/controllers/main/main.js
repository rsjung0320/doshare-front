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
          url: API.getTeam,
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
