(function () {

  angular
    .module('apilaApp')
    .controller('appointmentDetailCtrl', appointmentDetailCtrl);

  appointmentDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'apilaData', 'authentication'];
  function appointmentDetailCtrl ($routeParams, $location, $uibModal, apilaData, authentication) {
    var vm = this;
    vm.appointmentid = $routeParams.appointmentid;

    vm.currentPath = $location.path();

    apilaData.appointmentById(vm.appointmentid)
      .success(function(data) {
        vm.data = { appointment : data };
        vm.pageHeader = {
          title: vm.data.appointment.reason
        };
      })
      .error(function (e) {
        console.log(e);
      });

  }

})();
