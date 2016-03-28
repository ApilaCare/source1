(function () {

  var routerApp = angular.module('loc8rApp', ['ui.router']);

  routerApp.config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');

      $stateProvider

          .state('home', {
              url: '/',
              template: '/home/home.view.html',
              controller: 'homeCtrl'
          })

          .state('about', {
              url: '/about',
              template: '/common/views/genericText.view.html',
              controller: 'aboutCtrl'
          })

          .state('locationDetail', {
              url: '/location/:locationid',
              template: '/locationDetail/locationDetail.view.html',
              controller: 'locationDetailCtrl'
          })

          .state('register', {
              url: '/register',
              template: '/auth/register/register.view.html',
              controller: 'registerCtrl'
          })

          .state('login', {
              url: '/login',
              template: '/auth/login/login.view.html',
              controller: 'loginCtrl'
          });

  });

  angular
    .module('loc8rApp')

})();
