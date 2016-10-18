'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope, $http, $location, $cookies, $timeout, $rootScope, ModalService, jwtHelper, loginService) {

    $scope.authorization = "";
    $scope.pwHidden = false;
    $scope.remember = false;
    // to-do
    // 1. 암호화해서 보낸다.
    $scope.submit = function() {
      // 1. email, password를 가져온다
      var email = $scope.email;
      var password = $scope.password;

      // 2. validation 체크를 한다.
      if ($scope.form.$valid) {
        // console.log('OK!');
        // 3. response의 결과값을 받아온다.
        console.log(' $scope.remember :',  $scope.remember);

        // 로그인 서비스 이용
        loginService.login(API, $http, $scope, jwtHelper, $cookies, ModalService, $rootScope, $location);

      } else {
        // 에러팝업 띄우기.
        $scope.pwHidden = true;
      }
    }

    $scope.signUp = function() {
      $location.path("/signup");
    }
  });
