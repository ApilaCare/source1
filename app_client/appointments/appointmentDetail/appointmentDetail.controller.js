(function () {

  angular
    .module('apilaApp')
    .controller('appointmentDetailCtrl', appointmentDetailCtrl);

  appointmentDetailCtrl.$inject = ['$routeParams', '$location', 'apilaData', 'authentication', '$uibModal'];
  function appointmentDetailCtrl ($routeParams, $location, apilaData, authentication, $uibModal) {
    var vm = this;
    vm.appointmentid = $routeParams.appointmentid;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    apilaData.appointmentById(vm.appointmentid)
      .success(function(data) {
        vm.data = {appointment:data};
        vm.pageHeader = {title:vm.data.appointment.reason};
      })
      .error(function (e) {
        console.log(e);
      });
  }
})();
