(function () {

  angular
    .module('loc8rApp')
    .controller('appointmentDetailCtrl', appointmentDetailCtrl);

  appointmentDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'apilaData', 'authentication'];
  function appointmentDetailCtrl ($routeParams, $location, $modal, apilaData, authentication) {
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
