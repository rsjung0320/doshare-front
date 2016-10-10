'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginLoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope, $http, $location, $cookies, $timeout, $rootScope, ModalService) {

    $scope.authorization = "";
    $scope.pwHidden = false;
    // to-do
    // 1. 암호화해서 보낸다.
    $scope.submit = function() {
      // 1. email, password를 가져온다
      var email = $scope.email;
      var password = $scope.password;
      console.log('email : ', $scope.email);
      console.log('password : ', $scope.password);
      // console.log('here');

      // 2. validation 체크를 한다.
      if ($scope.form.$valid) {
        // console.log('OK!');
        // 3. response의 결과값을 받아온다.
        $http({
            url: API.postSignin,
            method: "POST",
            data: {
              email: $scope.email,
              password: $scope.password
            }
          })
          .success(function(token) {
            console.log('token :', token.toString());
            $scope.authorization = 'Bearer ' + token;
            $cookies.put('token', $scope.authorization);

            // 암호화 하기
            // 3-1 user 정보를 요청한다.
            TASK_USER.postUserInfo(angular, $http, $scope.email, $cookies, $rootScope, $location);

          }).error(function(response) {
            ModalService.showModal({
              templateUrl: 'views/global/modal.html',
              controller: 'modalController'
            }).then(function(modal) {
              modal.element.modal();
              $scope.password = '';
            });
          });

      } else {
        // 에러팝업 띄우기.
        $scope.pwHidden = true;
      }
    }

    $scope.signUp = function() {
      $location.path("/signup");
    }

    $scope.hidePwErrorMsg = function() {
      $scope.pwHidden = false;
    }
  });
