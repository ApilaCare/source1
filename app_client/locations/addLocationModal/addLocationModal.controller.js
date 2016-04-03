(function () {

  angular
    .module('loc8rApp')
    .controller('newLocationModalCtrl', newLocationModalCtrl);

  newLocationModalCtrl.$inject = ['$modalInstance'];
  function newLocationModalCtrl ($modalInstance) {
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
