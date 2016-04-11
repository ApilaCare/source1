(function () {

  angular
    .module('apilaApp')
    .controller('newIssueModalCtrl', newIssueModalCtrl);

  newIssueModalCtrl.$inject = ['$uibModalInstance'];
  function newIssueModalCtrl ($uibModalInstance) {
    var vm = this;

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
