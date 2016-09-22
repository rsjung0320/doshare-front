'use strict';

// https://docs.angularjs.org/api/ngRoute/provider/$routeProvider

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'summernote',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $httpProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.headers.common = 'Content-Type: application/json; charset=utf-8';
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .controller('IndexCtrl', function($scope, $http, $location, $rootScope) {


      // $rootScope.$on("$locationChangeStart", function(event, next, current) {
      $rootScope.$on('$locationChangeStart', function() {
         $scope.currentPath = $location.path();
      });
      $scope.init = function(){
      };
      $scope.init();

  });
