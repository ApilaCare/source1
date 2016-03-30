(function () {

  angular
    .module('loc8rApp')
    .controller('issueCommentModalCtrl', issueCommentModalCtrl);

  issueCommentModalCtrl.$inject = ['$modalInstance'];
  function issueCommentModalCtrl ($modalInstance) {
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
