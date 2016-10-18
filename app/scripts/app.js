'use strict';

angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngSanitize',
    'summernote',
    'blockUI',
    'angularModalService',
    'angular-jwt'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main/main'
      })
      .when('/about', {
        templateUrl: 'views/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about/about',
        authenticated: true
      })
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login/login'
      })
      .when('/signup', {
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup/signup'
      })
      .when('/board/boardlist', {
        templateUrl: 'views/board/boardlist.html',
        controller: 'BoardlistCtrl',
        controllerAs: 'board/boardlist'
      })
      .when('/board/:idx', {
        templateUrl: 'views/board/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board/board'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

  })
  .run(function($rootScope, $http, $location, $cookies, $window, jwtHelper, $interval) {

    $rootScope.loginFlag = false;

    // refresh 토큰 재발행 관련 처리
    var rememberToken = function() {
      var token = $cookies.get('token');
      var refreshToken = $cookies.get('refreshToken');

      if (token && !jwtHelper.isTokenExpired(token)) {
        $rootScope.loginFlag = true;
        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('token');
      } else {
        if (refreshToken && !jwtHelper.isTokenExpired(refreshToken)) {

          var userInfo = jwtHelper.decodeToken(refreshToken);
          $http({
              url: API.postRefreshToken,
              method: API.POST,
              data: {
                email: userInfo.iss,
                role: userInfo.roles,
                refreshToken: refreshToken
              }
            })
            .success(function(data) {
              $rootScope.loginFlag = true;

              $cookies.remove('token');
              $cookies.remove('refreshToken');

              var authorization = 'Bearer ' + data.token;
              $cookies.put('token', data.token, {
                'expires': jwtHelper.getTokenExpirationDate(data.token)
              });
              // refreshtoken가 있을 경우 저장한다.
              $cookies.put('refreshToken', data.refreshToken, {
                'expires': jwtHelper.getTokenExpirationDate(data.refreshToken)
              });

              $http.defaults.headers.common.Authorization = authorization;
            }).error(function(data, status) {
              if (status === 400) {
                // refresh가 30일이 넘은 것이니 다 지운다.

                $cookies.remove('token');
                $cookies.remove('refreshToken');
              }
            });
        } else {
          // refreshToken 도 없고, 만료가 된거면 다 지운다.
          $cookies.remove('token');
          $cookies.remove('refreshToken');
        }
      }
    };
    rememberToken();

    // 인증이 안되었을 경우 login으로 redirection 하는 부분
    // redirect to login page if not logged in and trying to access a restricted page
    // $rootScope.$on('$locationChangeStart', function(event, next, current) {
    $rootScope.$on('$locationChangeStart', function() {
      // console.log($location.path());
      var homePages = [''];
      var restrictedhomePage = homePages.indexOf($location.path()) === -1;

      var mainPages = ['/'];
      var restrictedMainPage = mainPages.indexOf($location.path()) === -1;

      var boardListPages = ['/board/boardlist'];
      var restrictedBoardListPage = boardListPages.indexOf($location.path()) === -1;

      var signUpPages = ['/signup'];
      var restrictedsignUpPagesPage = signUpPages.indexOf($location.path()) === -1;

      if (restrictedhomePage && restrictedMainPage && restrictedBoardListPage && !$cookies.get('token') && restrictedsignUpPagesPage) {
        $location.path('/login');
      }
    });


    // refresh 관련 처리,
    // to-do tab으로 끄거나 refresh 상태는 잘 모르겠음 추후 도전해 볼 것
    var isRefresh = false;

    $(document).keydown(function(e) {
      if ((e.keyCode === 82 && e.ctrlKey) || (e.keyCode === 116)) {
        isRefresh = true;
      }
    });

    $window.onbeforeunload = function() {
      if (!isRefresh) {
        // to-do 배포시에 주석 풀기
        // $cookies.remove('token');
      }
    };

    // 1시간 마다 토큰 재발행 관련 처리
    var intervalChangeToken = function() {

      var token = $cookies.get('token');
      var refreshToken = $cookies.get('refreshToken');
      var remember = false;

      if (refreshToken) {
        remember = true;
      }

      if (token && !jwtHelper.isTokenExpired(token)) {

        var userInfo = jwtHelper.decodeToken(token);
        $http({
            url: API.postRegenerateToken,
            method: API.POST,
            data: {
              email: userInfo.iss,
              role: userInfo.roles,
              remember: remember,
              token: token
            }
          })
          .success(function(data) {
            var authorization = 'Bearer ' + data.token;
            $cookies.put('token', data.token, {
              'expires': jwtHelper.getTokenExpirationDate(data.token)
            });
            // refreshtoken가 있을 경우 저장한다.
            if (data.refreshToken !== '') {
              $cookies.put('refreshToken', data.refreshToken, {
                'expires': jwtHelper.getTokenExpirationDate(data.refreshToken)
              });
            }

            $http.defaults.headers.common.Authorization = authorization;
          }).error(function(data, status) {
            if (status === 400) {
              $cookies.remove('token');
              $cookies.remove('refreshToken');
              $rootScope.loginFlag = false;
            }
          });
      } else {
        // 1시간 동안 로그인 하지 않고 그냥 보는 사람이 있을 것이다.!
        // 그럼 아래 코드는 에러는 없으니 그냥 형식상 이렇게 간다.
        $cookies.remove('token');
        $cookies.remove('refreshToken');
        $rootScope.loginFlag = false;
      }
    };

    // 1시간 마다 토큰을 재발행 해준다.
    $interval(function() {
      intervalChangeToken();
    }, 1000 * 60 * 60 * 1);

  })
  // .controller('IndexCtrl', function($scope, $http, $route, $location, $rootScope, $cookies, blockUI, $timeout) {
  .controller('IndexCtrl', function($scope, $http, $route, $location, $rootScope, $cookies) {

    $scope.currentPath = '/';
    // $rootScope.$on("$locationChangeStart", function(event, next, current) {
    $rootScope.$on('$locationChangeStart', function() {
      $scope.currentPath = $location.path();

      if ($scope.currentPath !== '/') {
        $('.navbar-default').css('background-color', '#FFFFFF');
      } else {
        $('.navbar-default').css('background-color', 'rgba(255, 255, 255, .0 )');
      }
    });

    $scope.init = function() {
      // blockUI.start('Loading...');
      // $timeout(function() {
      //   // Stop the block after some async operation.
      //   blockUI.stop();
      //   // $route.reload();
      // }, 1000);
    };
    $scope.init();

    $scope.logout = function() {
      $cookies.remove('userInfo');
      $cookies.remove('token');
      $cookies.remove('refreshToken');

      $http.defaults.headers.common.Authorization = '';
      $rootScope.loginFlag = false;
      $location.path('/');
      $route.reload();
    };

    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if ($scope.currentPath === '/') {
        if (scroll >= 100) {
          $('.navbar-default').css('background-color', '#FFFFFF');
        } else {
          $('.navbar-default').css('background-color', 'rgba(255, 255, 255, .0 )');
        }
      }
    });
  });
