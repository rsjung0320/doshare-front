'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginCtrl
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
          .success(function(data, status, headers, config) {
            var token = data.message;
            $scope.authorization = 'Bearer ' + token;
            $cookies.put('token', token);
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

    // $scope.hidePwErrorMsg = function() {
    //   $scope.pwHidden = false;
    // }
  });
