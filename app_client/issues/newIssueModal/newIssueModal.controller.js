(function () {

  angular
    .module('loc8rApp')
    .controller('newIssueModalCtrl', newIssueModalCtrl);

  newIssueModalCtrl.$inject = ['$modalInstance'];
  function newIssueModalCtrl ($modalInstance) {
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
