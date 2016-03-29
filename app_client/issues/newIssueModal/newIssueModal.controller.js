(function () {

  angular
    .module('loc8rApp')
    .controller('newIssueModalCtrl', newIssueModalCtrl);

  newIssueModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
  function newIssueModalCtrl ($modalInstance, loc8rData, locationData) {
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
