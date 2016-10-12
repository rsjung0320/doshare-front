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
    'angularModalService'
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

    // jwtOptionsProvider.config({
    //   tokenGetter: ['options', function(options) {
    //     // options.doSomething();
    //     console.log( $cookies.get('token'));
    //     return $cookies.get('token');
    //   }]
    // });
    //
    // $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

  })
  .run(function($rootScope, $http, $location, $cookies, $window) {
    $rootScope.loginFlag = false;

    if ($cookies.get('token')) {
      console.log($cookies.get('token'));
      $rootScope.loginFlag = true;
      $http.defaults.headers.common.Authorization = $cookies.get('token');
    }

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

      if (restrictedhomePage && restrictedMainPage && restrictedBoardListPage && !$cookies.get('token')) {
        $location.path('/login');
      }
    });


    // refresh 관련 처리,
    // to-do tab으로 끄거나 refresh 상태는 잘 모르겠음 추후 도전해 볼 것
    var isRefresh = false;

    $(document).keydown(function(e) {
      if ((e.keyCode === 82 && e.ctrlKey) || (e.keyCode === 116)) {
        // e.preventDefault();
        console.log('test');
        isRefresh = true;
      }
    });

    $window.onbeforeunload = function(e) {
      if (!isRefresh) {
        $cookies.remove('token');
        return 'Close';
      }
    };

    $window.onunload = function() {
      console.log('-----------------------------------');
    };
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
