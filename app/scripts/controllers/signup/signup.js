'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:SignupSignupCtrl
 * @description
 * # SignupSignupCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('SignupCtrl', function($scope, $http, $location) {

    $scope.submit = function(){
      console.log("userName : " + $scope.user.userName);
      console.log("email : " + $scope.user.email);
      console.log("password : " + $scope.user.password);
      console.log("confirmPassword : " + $scope.user.confirmPassword);

      // 1. validation 체크를 한다.
      //  1.1 password와 confirmPassword와 일치하는지 본다.
      //  1.2 TTA 인증 방식 코드르 가져와서 검증한다.
      // 2. 서버로 값을 보낸다.

      $http({
          url: "http://localhost:8080/api/v1/login/signup",
          method: "POST",
          data: {
            name : $scope.user.userName,
            email : $scope.user.email,
            password : $scope.user.password
          }
            // headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxseSIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE0NzMzOTc3Mzh9.lE-2brVPuZNWnz-x-xJJszdQmFTMBTOgZG4Ql9jItJs"}
        })
        .success(function(token) {
          $scope.authorization = 'Bearer ' + token;
          $http.defaults.headers.common = {"Authorization": $scope.authorization};

          // console.log(  $http.defaults.headers.common );
          // 3-1. susscess 시 path를 /로 이동시켜준다.
          // 토큰 혹은 다른 것을 포함하여 보낸다.
          $location.path('/');
        }).error(function(response) {
          console.log("error!!");
          console.log(response);
        });
      // 3. 성공 시 메인화면으로 보낸다.\
      //  3-1. 실패 시 에러메시지를 화면에 보여준다.

    }
  });
