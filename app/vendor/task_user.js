var TASK_USER = (function() {
  'use strict';

  function getUserInfo(angular, $http, email, $cookies){
    $http({
      url: API.getUserInfo + email,
      method: "GET",
      headers: {
        "Authorization": $cookies.get('token')
      }
    }).success(function(userInfo) {
      $cookies.put('userInfo', angular.toJson(userInfo));
      // var userInfo = angular.fromJson($cookies.get('userInfo'));
    }).error(function(error) {
      console.log('error : ', error);
    });
  }

  /*----------- TASK_USER Interface -----------------*/
  return {
    getUserInfo: getUserInfo
  };
  /*------------------------------------------------------*/

})(TASK_USER);
