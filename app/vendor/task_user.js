var TASK_USER = (function() {
  'use strict';

  // user 정보를 요청 후, 쿠키에 저장한다.
  function postUserInfo(angular, $http, email, $cookies, $rootScope, $location) {
    $http({
      url: API.postUserInfo,
      method: 'POST',
      data: {
        email: email
      },
      headers: {
        'Authorization': $cookies.get('token')
      }
    }).success(function(userInfo) {
      console.log('postUserInfo userInfo :', userInfo);
      $cookies.put('userInfo', angular.toJson(userInfo));
      // 로그인 메뉴를 로그아웃으로 변경한다.
      $rootScope.loginFlag = true;
      // susscess 시 path를 /로 이동시켜준다.
      $location.path('/');
    }).error(function(error) {
      console.log('error : ', error);
    });
  }

  /*----------- TASK_USER Interface -----------------*/
  return {
    postUserInfo: postUserInfo
  };
  /*------------------------------------------------------*/

})(TASK_USER);
