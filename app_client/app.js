(function () {

  angular.module('apilaApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/common/views/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/locations', {
        templateUrl: '/locations/locationsHome/locationsHome.view.html',
        controller: 'locationHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/locations/:locationid', {
        templateUrl: '/locations/locationDetail/locationDetail.view.html',
        controller: 'locationDetailCtrl',
        controllerAs: 'vm'
      })
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
      .when('/issues', {
        templateUrl: '/issues/issueHome/issueHome.view.html',
        controller: 'issueHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/issues/:issueid', {
        templateUrl: '/issues/issueDetail/issueDetail.view.html',
        controller: 'issueDetailCtrl',
        controllerAs: 'vm'
      })
      .when('/appointments', {
        templateUrl: '/appointments/appointmentHome/appointmentHome.view.html',
        controller: 'appointmentHomeCtrl',
        controllerAs: 'vm'
      })
      .when('/appointments/:appointmentsid', {
        templateUrl: '/appointments/appointmentDetail/appointmentDetail.view.html',
        controller: 'appointmentDetailCtrl',
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
