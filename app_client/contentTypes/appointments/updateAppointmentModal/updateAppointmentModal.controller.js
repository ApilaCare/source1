(function () {

  angular
    .module('apilaApp')
    .controller('updateAppointmentModalCtrl', updateAppointmentModalCtrl);

  updateAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getAppointment'];
  function updateAppointmentModalCtrl ($scope, $uibModalInstance, apilaData, authentication, getAppointment) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.formData = getAppointment;
    
    vm.originalData = JSON.parse(JSON.stringify(vm.formData));

    vm.formData.date = new Date(getAppointment.time);
    vm.formData.modifiedBy = authentication.currentUser().name;
    vm.formData.updateInfo.updateBy = authentication.currentUser().name;

    vm.onSubmit = function () {

      vm.formData.modifiedDate = new Date();
      vm.formData.updateInfo.updateDate = new Date();
      vm.formError = "";

    if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.locationName || !vm.formData.time || !vm.formData.date) {
            vm.formError = "All fields required, please try again";
            return false;
    } else {
          var changedFields = checkChangedFields(vm.originalData, vm.formData);
        
          if(changedFields.length > 0) {
              vm.formData.updateField = changedFields;
              vm.updateAppointment(vm.formData._id, vm.formData);
          } else {
              vm.modal.close();
          }
          
      }
    };

    vm.updateAppointment = function (id, formData) {
        apilaData.updateAppointment(id, formData)
        .success(function (appoint) {

          vm.formData.updateInfo.push(appoint.updateInfo[appoint.updateInfo.length - 1]);

          vm.modal.close(appoint);

        })
        .error(function (appoint) {
          vm.formError = "Something went wrong with updating the appointment, try again";
        });
      return false;
    };


    //settings for the datepicker popup
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

    vm.open = function() {
        vm.popup.opened = true;
    };


    vm.modal = {
      close : function (result) {
        $uibModalInstance.close(result);
      },
      cancel : function () {
        $uibModalInstance.dismiss('cancel');
      }
    };
      
    //checks what fields changed in the updates
    function checkChangedFields(oldData, newData) {
        var d1 = new Date(oldData.date);
        var d2 = new Date(newData.date);
        
        console.log(oldData.date + " : " + newData.date);
        
        var diff = [];
        var attributeArr = ["reason", "residentGoing", "locationName", "locationDoctor", 
                            "time", "transportation", "cancel"];
        
        for(var i = 0; i < attributeArr.length; ++i) {
            
            if(oldData[attributeArr[i]] !== newData[attributeArr[i]] ) {
                
                diff.push({"field": attributeArr[i], "old": oldData[attributeArr[i]] , 
                           "new": newData[attributeArr[i]]});
            }
        }
        
        if(d1.getMonth() !== d2.getMonth() || d1.getYear() !== d2.getYear() || d1.getDay() !== d2.getDay()) {
                
            diff.push({"field": "date", "old": oldData.date , 
                           "new": newData.date});
            }
        
        return diff;
    }

  }

})();
