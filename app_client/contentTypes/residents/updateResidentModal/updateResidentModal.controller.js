(function() {

    angular
        .module('apilaApp')
        .controller('updateResidentModalCtrl', updateResidentModalCtrl);

    updateResidentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getResident'];

    function updateResidentModalCtrl($scope, $uibModalInstance, apilaData, authentication, getResident) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.formData = getResident;
        console.log(getResident);
        
        vm.formData.admissionDate = new Date(getResident.admissionDate);
        vm.formData.birthDate = new Date(getResident.birthDate);

        vm.forms = ['Administrative', 'Bathing', 'Mobility', 'Allergy', 'Sleep', 'Continent', 'Nutrition', 'Physical Condition', 'Psychosocial', 'Pain', 'Vitals'];

        vm.selectedForm = vm.forms[1];

        vm.selectForm = function(name) {
            vm.selectedForm = name;
        }

        vm.onSubmit = function() {

            vm.formData.modifiedDate = new Date();
            vm.formData.updateInfo.updateDate = new Date();
            vm.formError = "";

            vm.updateResident(vm.formData._id, vm.formData);
 
            
        };
        
        vm.updateResident = function(id, formData) {
            apilaData.updateResident(id, formData)
                .success(function(resident) {
                    //vm.formData.updateInfo.push(appoint.updateInfo[appoint.updateInfo.length - 1]);

                    vm.modal.close(resident);
                })
                .error(function(appoint) {
                    vm.formError = "Something went wrong with updating the appointment, try again";
                });
            return false;
        };

         //settings for the birth date picker popup
        vm.birthDateOpened = false;
        
        vm.openBirthDate = function() {
            vm.birthDateOpened = true;
        };
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        //settings for the admission datepicker popup
        vm.admissionOpened = false;

        vm.openAdmission = function() {
            vm.admissionOpened = true;
        };


        vm.modal = {
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
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
