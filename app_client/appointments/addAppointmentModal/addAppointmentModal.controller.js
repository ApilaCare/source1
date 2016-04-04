(function () {

  angular
    .module('loc8rApp')
    .controller('newAppointmentModalCtrl', newAppointmentModalCtrl);

  newAppointmentModalCtrl.$inject = ['$uibModalInstance'];
  function newAppointmentModalCtrl ($uibModalInstance) {
    var vm = this;

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.location.name || !vm.formData.time) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddAppointment(vm.issueData.issueid, vm.formData);
      }
    };

    vm.doAddAppointment = function (issueid, formData) {
      apilaData.addIssueCommentById(issueid, {
        commentText : formData.commentText
      })
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Your comment has not been saved, please try again";
        });
      return false;
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
