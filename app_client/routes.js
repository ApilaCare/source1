(function () {

  angular.module('apilaApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngMaterial']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider

      // boring pages routes
      .when('/', {
        templateUrl: '/contentTypes/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/contentTypes/about/about.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })

      // location routes
      .when('/locations', {
        templateUrl: '/contentTypes/locations/locationsHome/locationsHome.view.html',
        controller: 'locationHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/locations/:locationid', {
        templateUrl: '/contentTypes/locations/locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
      })

      // user routes
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })

      // issue routes
      .when('/issues', {
        templateUrl: '/contentTypes/issues/issueHome/issueHome.view.html',
        controller: 'issueHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/issues/:issueid', {
        templateUrl: '/contentTypes/issues/issueDetail/issueDetail.view.html',
        controller: 'issueDetailCtrl',
        controllerAs: 'vm'
      })

      // appointment routes
      .when('/appointments', {
        templateUrl: '/contentTypes/appointments/appointmentHome/appointmentHome.view.html',
        controller: 'appointmentHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/appointments/:appointmentid', {
        templateUrl: '/contentTypes/appointments/appointmentDetail/appointmentDetail.view.html',
        controller: 'appointmentDetailCtrl',
        controllerAs: 'vm'
      })

      // resident routes
      .when('/residents', {
        templateUrl: '/contentTypes/residents/residentHome/residentHome.view.html',
        controller: 'residentHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/residents/:residentid', {
        templateUrl: '/contentTypes/residents/residentDetail/residentDetail.view.html',
        controller: 'residentDetailCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('apilaApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();
