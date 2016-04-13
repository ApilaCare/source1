(function () {

  angular
    .module('apilaApp')
    .controller('newIssueModalCtrl', newIssueModalCtrl);

  newIssueModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getIssue'];
  function newIssueModalCtrl ($scope, $uibModalInstance, apilaData, authentication, getIssue) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    //getIssue is out current issue we are updating, if it's null that means we are not in update modes
    vm.isUpdate = (getIssue === null) ? false:true;
    
    vm.submitText = "Submit New Issue";
      
    if(vm.isUpdate === true) {
        vm.formData = getIssue;
        vm.submitText = "Submit Updated issue";
    }
      
      
    vm.onSubmit = function () {
      vm.formError = "";   
        
      if (!vm.formData.title || !vm.formData.responsibleParty || !vm.formData.resolutionTimeframe || !vm.formData.description) {
        vm.formError = "All the fields are required. Please try again.";
        console.log('onSubmit if');
        return false;
      } else {
        console.log('onSubmit else');
        
        if(vm.isUpdate === true) {
            vm.updateIssue(vm.formData._id, vm.formData);
        } else {
            vm.doAddIssue(vm.formData);
        } 
          
        
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
      
    vm.updateIssue = function(issueid, formData) {
        apilaData.updateIssue(issueid, formData)
        .success(function (iss) {
            console.log("Updated issue");
            
            vm.modal.close(iss);
            
        })
        .error(function (iss) {
            vm.formError = "Something went wrong while updating the issue, try again";
        });
    }

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
