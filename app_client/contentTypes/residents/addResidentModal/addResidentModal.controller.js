(function () {

  angular
    .module('apilaApp')
    .controller('addResidentModalCtrl', addResidentModalCtrl);

  addResidentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication'];
  function addResidentModalCtrl ($scope, $uibModalInstance, apilaData, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.formData.firstName || !vm.formData.lastName || !vm.formData.birthDate || !vm.formData.buildingStatus || !vm.formData.sex ) {
        vm.formError = "First name, last name, birth date, building status and sex are required";
        return false;
      } else {
        console.log(vm.formData);
        vm.doAddResident(vm.formData);
      }
    };

    vm.doAddResident = function (formData) {
        apilaData.addResident(formData)
        .success(function (resident) {


          apilaData.residentList.residents.push(resident);
          vm.modal.close(resident);
        })
        .error(function (resident) {
          vm.formError = "Something went wrong with the appointment, try again";
        });
      return false;
    };


    //settings for the birth datepicker popup
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

      
    //settings for the addmission datepicker popup
    vm.addmissionOpened = false;
      
    vm.openAddmission = function() {
        vm.addmissionOpened = true;
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
