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

        var name = vm.data.appointment.residentGoing + " to " + vm.data.appointment.locationName;
        exportPdf.exportAppointmentDetail(name, vm.data);
      }

      
      vm.popupAppointmentCommentForm = function(appointment) {
         var modalInstance = $uibModal.open({
          templateUrl: '/contentTypes/appointments/appointmentCommentModal/appointmentCommentModal.view.html',
          controller: 'appointmentCommentModalCtrl as vm',
          resolve: {
              appointmentData: function() {
                return appointment;
              }
          }
        
        });
          
          
        modalInstance.result.then(function (data) {
          vm.data.appointment.appointmentComment.push(data);
        });
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
