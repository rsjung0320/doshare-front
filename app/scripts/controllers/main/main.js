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

    $scope.init = function(){
      if($cookies.get('token') !== undefined){
        $http({
            url: API.getTeam,
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
      }
    }

    $scope.init();
  });
