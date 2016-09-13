'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginLoginCtrl
 * @description
 * # LoginLoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('LoginCtrl', function($scope, $http, $location) {

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
          url: "http://localhost:8080/api/v1/login/signin",
          method: "POST",
          data: {
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
    }

    $scope.signUp = function() {
      $location.path("/signup");
    }

    $scope.test1 = function() {
      $http({
          url: 'http://localhost:8080/admin/api/user4',
          method: 'GET'
          // headers: {"Authorization": $scope.authorization}
        })
        .success(function(resp) {
          // $scope.authorization = 'Bearer ' + token;
          console.log('resp : ' + resp);

        }).error(function(response) {
          console.log('error : ' + response);
        });
    }

    function isEmpty(email, password) {
      var result = false;
      if (email === '' || email === null || password === '' || password === null) {
        result = true;
      }
      return result;
    }

  });
