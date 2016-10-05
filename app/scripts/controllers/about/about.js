'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AboutCtrl', function($scope, $http, $httpParamSerializerJQLike, $location) {

    $scope.content = "";

    // console.log('Summernote is launched');
    $scope.init = function() {}();

    $scope.change = function(contents) {
      $scope.content = contents;
    };

    $scope.imageUpload = function(files) {
      TASK_BOARD.task_imageUpload($http, $scope, files);
    };

    $scope.uploadBoard = function() {
      var path = '/board/boardlist';
      TASK_BOARD.task_uploadBoard($scope, $http, $location, path);
    };
  });
