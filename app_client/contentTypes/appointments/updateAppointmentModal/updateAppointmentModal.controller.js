(function() {

    angular
        .module('apilaApp')
        .controller('updateAppointmentModalCtrl', updateAppointmentModalCtrl);

    updateAppointmentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getAppointment'];

    function updateAppointmentModalCtrl($scope, $uibModalInstance, apilaData, authentication, getAppointment) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.formData = getAppointment;

        vm.originalData = JSON.parse(JSON.stringify(vm.formData));

        vm.formData.date = new Date(getAppointment.time);
        vm.formData.modifiedBy = authentication.currentUser().name;
        vm.formData.updateInfo.updateBy = authentication.currentUser().name;

        vm.resident = {};
        
        vm.resident.name = vm.formData.residentGoing.firstName;
        vm.resident.id = vm.formData.residentGoing._id;

         vm.selectResident = function(name, id) {
             vm.resident.name = name;
             vm.resident.id = id;
        }

        vm.onSubmit = function() {

            vm.formData.modifiedDate = new Date();
            vm.formData.updateInfo.updateDate = new Date();
            vm.formError = "";

            if (!vm.formData.reason || !vm.formData.residentGoing || !vm.formData.locationName || !vm.formData.time || !vm.formData.date) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.formData.residentGoing.firstName = vm.resident.name;
                vm.formData.residentId = vm.resident.id;
                
                var changedFields = checkChangedFields(vm.originalData, vm.formData);
                
                if (changedFields.length > 0) {
                    vm.formData.updateField = changedFields;
                    vm.updateAppointment(vm.formData._id, vm.formData);
                } else {
                    vm.modal.close();
                }
            }
        };

        vm.updateAppointment = function(id, formData) {
            apilaData.updateAppointment(id, formData)
                .success(function(appoint) {
                    vm.formData.updateInfo.push(appoint.updateInfo[appoint.updateInfo.length - 1]);

                    vm.modal.close(appoint);
                })
                .error(function(appoint) {
                    vm.formError = "Something went wrong with updating the appointment, try again";
                });
            return false;
        };

        apilaData.residentsList()
            .success(function(residentList) {
                vm.residentList = residentList;

            })
            .error(function(residentList) {
                console.log("Error retriving the list of residents");
            });

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

        //checks what fields changed in the updates
        function checkChangedFields(oldData, newData) {
            var d1 = new Date(oldData.time);
            var d2 = new Date(newData.date);
            var t1 = new Date(newData.time);

            console.log(oldData.time + " : " + newData.time);

            var diff = [];
            var attributeArr = [
                "reason",
                "locationName",
                "locationDoctor",
                "transportation",
                "cancel"
            ];

            for (var i = 0; i < attributeArr.length; ++i) {

                if (oldData[attributeArr[i]] !== newData[attributeArr[i]]) {

                    diff.push({
                        "field": attributeArr[i],
                        "old": oldData[attributeArr[i]],
                        "new": newData[attributeArr[i]]
                    });
                }
            }
            
             
             if(oldData["residentGoing"].firstName !== newData["residentGoing"].firstName) {
                 diff.push({
                     "field": "residentGoing",
                     "old": oldData["residentGoing"].firstName,
                     "new": newData["residentGoing"].firstName
                 });
             }

            var timeChanged = false;
            
            //checking the date portion
            if(d1.toDateString() !== d2.toDateString()) {
                 timeChanged = true;
             }
            
            //check the time portion
            if(d1.getHours() !== t1.getHours() || d1.getMinutes() !== t1.getMinutes()) {
                timeChanged = true;
             }
                
            if(timeChanged === true) {
                d2.setHours(t1.getHours());
                d2.setMinutes(t1.getMinutes());
                d2.setSeconds(t1.getSeconds());
                
                diff.push({
                     "field": "time",
                     "old": d1,
                     "new": d2
                 });
            } 
            
            return diff;
        }

    }

})();
