'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginLoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.submit = function() {
      console.log("HERE!!!!!!!!@#!@#");
      // $http.get("")
      //   .then(function(response) {
      //     $scope.content = response.data;
      //     $scope.statuscode = response.status;
      //     $scope.statustext = response.statustext;
      //   });
    }
  });
