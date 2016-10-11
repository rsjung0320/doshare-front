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
  .config(function($routeProvider, $httpProvider, jwtOptionsProvider) {
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
    // $httpProvider.defaults.headers.common = 'Content-Type: application/json, text/plain, *﻿/﻿*';
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

  })
  .run(function($rootScope, $http, $location, $cookies) {
    $rootScope.loginFlag = false;
    console.log('run!!!');

    if ($cookies.get('token')) {
      console.log($cookies.get('token'));
      $rootScope.loginFlag = true;
      $http.defaults.headers.common.Authorization = $cookies.get('token');

    }
  })
  .controller('IndexCtrl', function($scope, $http, $route, $location, $rootScope, $cookies, blockUI, $timeout) {

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
      blockUI.start('Loading...');
      $timeout(function() {
        // Stop the block after some async operation.
        blockUI.stop();
        // $route.reload();
      }, 1000);

    };
    $scope.init();

    $scope.logout = function() {
      $cookies.remove('userInfo');
      $cookies.remove('token');
      $rootScope.loginFlag = false;


      $location.path('/login');
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
