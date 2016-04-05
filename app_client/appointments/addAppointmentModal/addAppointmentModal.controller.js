(function () {

  angular
    .module('loc8rApp')
    .controller('newAppointmentModalCtrl', newAppointmentModalCtrl);

  newAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication'];
  function newAppointmentModalCtrl ($scope, $uibModalInstance, apilaData, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();
      
    vm.onSubmit = function () {
      vm.formError = "";
        
      if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.location.name 
          || !vm.formData.time || !vm.formData.date || !vm.formData.location.doctor 
          || !vm.formData.location.phone || !vm.formData.location.address) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddAppointment(vm.formData);
      }
    };

    vm.doAddAppointment = function (formData) {
        apilaData.addAppointment(formData)
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Something went wrong with the appointment, try again";
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
