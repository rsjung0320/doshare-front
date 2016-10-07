'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AboutCtrl', function($scope, $http, $location, $cookies) {

    $scope.content = "";

    // console.log('Summernote is launched');
    $scope.init = function() {}();

    $scope.change = function(contents) {
      $scope.content = contents;
    };

    $scope.imageUpload = function(files) {
      TASK_BOARD.imageUpload($http, $scope, $cookies, files);
    };

    $scope.uploadBoard = function() {
      var path = '/board/boardlist';
      TASK_BOARD.uploadBoard($scope, $http, $location, $cookies, path);
    };
  });
