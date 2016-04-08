(function () {

  angular
    .module('apilaApp')
    .controller('updateAppointmentModalCtrl', updateAppointmentModalCtrl);

  updateAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getAppointment'];
  function updateAppointmentModalCtrl ($scope, $uibModalInstance, apilaData, authentication, getAppointment) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.formData = getAppointment;

    vm.formData.date = new Date(getAppointment.time);
    vm.formData.modifiedBy = authentication.currentUser().name;
    vm.formData.updateInfo.updateBy = authentication.currentUser().name;

    vm.onSubmit = function () {

      vm.formData.modifiedDate = new Date();
      vm.formData.updateInfo.updateDate = new Date();
      vm.formError = "";

    if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.locationName || !vm.formData.time || !vm.formData.date) {
            vm.formError = "All fields required, please try again";
            return false;
    } else {
          vm.updateAppointment(vm.formData._id, vm.formData);
      }
    };

    vm.updateAppointment = function (id, formData) {
        apilaData.updateAppointment(id, formData)
        .success(function (appoint) {

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
