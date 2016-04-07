(function () {

  angular
    .module('apilaApp')
    .controller('updateAppointmentModalCtrl', updateAppointmentModalCtrl);

  updateAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication'];
  function updateAppointmentModalCtrl ($scope, $uibModalInstance, apilaData, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.onSubmit = function () {
      vm.formError = "";
      vm.updateAppointment(vm.formData);
    };

    vm.updateAppointment = function (formData) {
        apilaData.addAppointment(formData)
        .success(function (appoint) {

          //add to list
          apilaData.appointList.appointments.push(appoint);

          vm.modal.close(appoint);
        })
        .error(function (appoint) {
          vm.formError = "Something went wrong with updating the appointment, try again";
        });
      return false;
    };


    //settings for the datepicker popup
    vm.popup = {
        opened: false
    };

    vm.open = function() {
        vm.popup.opened = true;
    };

    vm.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    vm.open = function() {
        vm.popup.opened = true;
    };


    vm.modal = {
      close : function (result) {
        $uibModalInstance.close(result);
      },
      cancel : function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

  }

})();
