(function () {

  angular
    .module('apilaApp')
    .controller('appointmentDetailCtrl', appointmentDetailCtrl);

  appointmentDetailCtrl.$inject = ['$routeParams', '$location', 'apilaData', 'authentication', '$uibModal', 'exportPdf'];
  function appointmentDetailCtrl ($routeParams, $location, apilaData, authentication, $uibModal, exportPdf) {
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


      vm.exportAppointment = function() {

        var name = new Date().toDateString();
        console.log(vm.data);
        exportPdf.exportAppointmentDetail(name, vm.data);
      }

      vm.popupUpdateAppointmentForm = function (appointment) {
        var modalInstance = $uibModal.open({
          templateUrl: '/contentTypes/appointments/updateAppointmentModal/updateAppointmentModal.view.html',
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
