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

        vm.pageHeader = {
          title: vm.data.appointment.residentGoing + " going to " + vm.data.appointment.locationName,
        };
      })
      .error(function (e) {
        console.log(e);
      });

      vm.popupUpdateAppointmentForm = function (appointment) {
        var modalInstance = $uibModal.open({
          templateUrl: '/appointments/updateAppointmentModal/updateAppointmentModal.view.html',
          controller: 'updateAppointmentModalCtrl as vm',
          resolve: {
              getAppointment: function() {
                return appointment;
              }
          }
        });
      };
  }
})();
