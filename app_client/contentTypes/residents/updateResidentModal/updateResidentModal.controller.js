(function() {

    angular
        .module('apilaApp')
        .controller('updateResidentModalCtrl', updateResidentModalCtrl);

    updateResidentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getResident'];

    function updateResidentModalCtrl($scope, $uibModalInstance, apilaData, authentication, getResident) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.formData = getResident;

        vm.forms = ['Administrative', 'Bathing', 'Mobility', 'Allergy', 'Sleep', 'Continent', 'Nutrition', 'Physical Condition', 'Psychosocial', 'Pain', 'Vitals'];
        
        vm.selectedForm = vm.forms[1];
        
        vm.selectForm = function(name) {
            vm.selectedForm = name;
        }
        
        vm.onSubmit = function() {

            vm.formData.modifiedDate = new Date();
            vm.formData.updateInfo.updateDate = new Date();
            vm.formError = "";

            if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.locationName || !vm.formData.time || !vm.formData.date) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                var changedFields = checkChangedFields(vm.originalData, vm.formData);

                if (changedFields.length > 0) {
                    vm.formData.updateField = changedFields;
                    vm.updateAppointment(vm.formData._id, vm.formData);
                } else {
                    vm.modal.close();
                }
            }
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
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        };

     

    }

})();
