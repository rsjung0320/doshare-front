'use strict';

/**
 * @ngdoc service
 * @name appApp.login/loginService
 * @description
 * # login/loginService
 * Service in the appApp.
 */
angular.module('appApp')
  .service('loginService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var login = function(API, $http, $scope, jwtHelper, $cookies, ModalService, $rootScope, $location){
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
            // expires 가 25일 이상만 되도 저장이 안된다. 크롬 정책인듯 하다.
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

    };

    return {
      login: login
    };
  });
