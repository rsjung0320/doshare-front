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
      // 3-1. susscess 시 path를 /로 이동시켜준다. 토큰 혹은 다른 것을 포함하여 보낸다.


      // var url = "http://localhost:8080/login";
      // $http({
      //     method: 'JSONP',
      //     url: url
      // }).
      // success(function(status) {
      //     //your code when success
      //     console.log("success");
      //
      // }).
      // error(function(status) {
      //     //your code when fails
      //     console.log("error : ",  status);
      //     $scope.content = status.data;
      //     console.log("error : ",  $scope.content);
      //     $scope.statuscode = status.status;
      //     console.log("error : ",  $scope.statuscode);
      //     $scope.statustext = status.statustext;
      //     console.log("error : ",  $scope.statustext);
      // });

      $http({
          url: "http://localhost:8080/login",
          method: "GET"
        })
        .success(function(response) {
          alert(response);
          console.log("test!!!");
          console.log("response : " + response);
        }).error(function(response){
            console.log("error!!");
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
