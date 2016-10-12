'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope, $http, $location, $cookies, $timeout, $rootScope, ModalService, jwtHelper) {

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
        $http({
            url: API.postSignin,
            method: "POST",
            data: {
              email: $scope.email,
              password: $scope.password,
              remember: $scope.remember
            }
          })
          .success(function(data, status, headers, config) {
            $scope.authorization = 'Bearer ' + data.token;
            $cookies.put('token', data.token, {'expires': jwtHelper.getTokenExpirationDate(data.token)});
            // refreshtoken가 있을 경우 저장한다.
            if(data.refreshToken !== ''){
              $cookies.put('refreshToken', data.refreshToken, {'expires': jwtHelper.getTokenExpirationDate(data.refreshToken)});
            }

            // to-do 암호화 하기
            // 3-1 user 정보를 요청한다.
            $http.defaults.headers.common.Authorization = $scope.authorization;

            TASK_USER.postUserInfo(angular, $http, $scope.email, $cookies, $rootScope, $location);

          }).error(function(data, status, headers, config) {
            if(status === 400){
              ModalService.showModal({
                templateUrl: 'views/global/loginModal.html',
                controller: 'loginModalController'
              }).then(function(modal) {
                modal.element.modal();
                $scope.password = '';
              });
            }
          });

      } else {
        // 에러팝업 띄우기.
        $scope.pwHidden = true;
      }
    }

    $scope.signUp = function() {
      $location.path("/signup");
    }
  });
