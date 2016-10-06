'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginLoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope, $http, $location, $cookies) {

    $scope.authorization = "";
    // $scope.authorization = 'Bearer ' + token;
    // to-do
    // 1. 암호화해서 보낸다.

    $scope.submit = function() {
      // 1. email, password를 가져온다
      var email = $scope.user.email;
      var password = $scope.user.password;

      // to-do 생각해보니, 태그 자체에 required를 붙였으니 한번 더 할 필요는 없는 것 같아. 추후에 삭제하기
      if (!isEmpty(email, password)) {
        // 2. validation 체크를 한다.
      } else {
        // 에러팝업 띄우기
      }

      // 3. response의 결과값을 받아온다.

      $http({
          url: API.postSignin,
          method: "POST",
          data: {
            email : $scope.user.email,
            password : $scope.user.password
          }
        })
        .success(function(token) {
          console.log('token :', token.toString());
          $scope.authorization = 'Bearer ' + token;
          $cookies.put('token', $scope.authorization);

          // to-do 글로벌로 올린다.
          // 암호화 하기
          // 3-1 user 정보를 요청한다.
          TASK_USER.getUserInfo(angular, $http, $scope.user.email, $cookies);
          // 3-2. susscess 시 path를 /로 이동시켜준다.
          $location.path('/');
        }).error(function(response) {
          console.log('error!! : ', response);
        });
    }

    $scope.signUp = function() {
      $location.path("/signup");
    }

    function isEmpty(email, password) {
      var result = false;
      if (email === '' || email === null || password === '' || password === null) {
        result = true;
      }
      return result;
    }

  });
