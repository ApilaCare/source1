(function () {

  angular
    .module('apilaApp')
    .controller('newIssueModalCtrl', newIssueModalCtrl);

  newIssueModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication'];
  function newIssueModalCtrl ($scope, $uibModalInstance, apilaData, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.onSubmit = function () {
      vm.formError = "";

      if (!vm.formData.title || !vm.formData.responsibleParty || !vm.formData.resolutionTimeframe || !vm.formData.description) {
        vm.formError = "All the fields are required. Please try again.";
        console.log('onSubmit if');
        return false;
      } else {
        console.log('onSubmit else');
        vm.doAddIssue(vm.formData);
      }
    };

    vm.doAddIssue = function (formData) {
        apilaData.addIssue(formData)
        .success(function (iss) {
          console.log('doAddIssue');
          //add to list
          apilaData.issueList.issues.push(iss);

          vm.modal.close(iss);
        })
        .error(function (iss) {
          vm.formError = "Something went wrong with the issue, try again";
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
