(function () {

  angular
    .module('loc8rApp')
    .controller('newAppointmentModalCtrl', newAppointmentModalCtrl);

  newAppointmentModalCtrl.$inject = ['$modalInstance'];
  function newAppointmentModalCtrl ($modalInstance) {
    var vm = this;


    vm.modal = {
      close : function (result) {
        $modalInstance.close(result);
      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };

  }

})();
