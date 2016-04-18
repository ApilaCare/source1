(function () {

  angular
    .module('apilaApp')
    .controller('newAppointmentModalCtrl', newAppointmentModalCtrl);

  newAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication'];
  function newAppointmentModalCtrl ($scope, $uibModalInstance, apilaData, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.resident= {name: "Choose a resident", id: "-1"};

    vm.selectResident = function(name, id) {
        vm.resident.name = name;
        vm.resident.id = id;
     }

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.formData.reason || !vm.formData.locationName || !vm.formData.time || !vm.formData.date) {
        vm.formError = "Reason, Location, Time, and Date is required. Please try again.";
        return false;
      } else {
        vm.formData.residentId = vm.resident.id;
        vm.doAddAppointment(vm.formData);
      }
    };

    vm.doAddAppointment = function (formData) {
        apilaData.addAppointment(formData)
        .success(function (appoint) {

          console.log(appoint);
          // add to list
          apilaData.appointList.appointments.push(appoint);
          vm.modal.close(appoint);
        })
        .error(function (appoint) {
          vm.formError = "Something went wrong with the appointment, try again";
        });
      return false;
    };

    apilaData.residentsList()
            .success(function (residentList) {
                console.log(residentList);
                vm.residentList = residentList;
             })
            .error(function (residentList) {
                console.log("Error retriving the list of residents");
             });

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
