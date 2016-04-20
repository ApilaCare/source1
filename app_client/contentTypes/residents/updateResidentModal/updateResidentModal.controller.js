(function() {

    angular
        .module('apilaApp')
        .controller('updateResidentModalCtrl', updateResidentModalCtrl);

    updateResidentModalCtrl.$inject = ['$scope', '$uibModalInstance', 'apilaData', 'authentication', 'getResident'];

    function updateResidentModalCtrl($scope, $uibModalInstance, apilaData, authentication, getResident) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.formData = getResident;

         vm.originalData = JSON.parse(JSON.stringify(vm.formData));

        vm.formData.modifiedBy = authentication.currentUser().name;
        vm.formData.updateInfo.updateBy = authentication.currentUser().name;

        vm.formData.admissionDate = new Date(getResident.admissionDate);
        vm.formData.birthDate = new Date(getResident.birthDate);

        // select between forms
        vm.forms = ['Administrative', 'Bathing', 'Mobility', 'Allergy', 'Sleep', 'Continent', 'Nutrition', 'Physical Condition', 'Psychosocial', 'Pain', 'Vitals'];

        vm.selectedForm = vm.forms[0];
        vm.selectForm = function(name) {
            vm.selectedForm = name;
        }

        vm.onSubmit = function() {

            vm.formData.modifiedDate = new Date();
            vm.formData.updateInfo.updateDate = new Date();
            vm.formError = "";

            var changedFields = checkChangedFields(vm.originalData, vm.formData);

                if (changedFields.length > 0) {
                    vm.formData.updateField = changedFields;
                    vm.updateResident(vm.formData._id, vm.formData);
                } else {
                    vm.modal.close();
                }
        };

        vm.updateResident = function(id, formData) {
            apilaData.updateResident(id, formData)
                .success(function(resident) {
                    //vm.formData.updateInfo.push(appoint.updateInfo[appoint.updateInfo.length - 1]);
                    pushNewValues();
                    resetFields();
                
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

        // modal closing
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

            var diff = [];
            var attributeArr = [
                "firstName", "lastName", "middleName", "maidenName", "sex",
                "buildingStatus", "newfoodAllergies", "newmedicationAllergies", "typeOfBathing", "timeOfBathing",
                "frequencyOfBathing", "acceptanceOfBathing", "bowelContinent", "constipated", "laxative",
                "bladderContinent", "dribbles", "catheter", "toiletingDevice", "transfers", "fallRisk",
                "bedReposition", "overallNutrition", "poorNutritionIntervention", "diabetic", "diabeticType",
                "regularBloodSugarMonitoring", "bedtimeSnack", "adaptiveEquipment", "needsFoodInSmallPeices",
                "typeOfDiet", "newfoodLikes", "newfoodDislikes", "havePain", "painLocation", "painDescription",
                "maxPainTime", "painIncreasedBy", "painDecreasedBy", "height", "skinCondition", "wearsHearingAid",
                "teethCondition", "newpsychosocialStatus", "psychosocialResponsiveness", "mood", "comprehension",
                "generalActivityParticipation", "diningRoomParticipation", "busRideParticipation",
                "fitnessClassParticipation", "timeInRoom", "preferedActivites", "useFitnessEquipmentIndependently",
                "familyInvolvement", "usualBedtime", "usualArisingTime", "nap", "assistanceToBed",
                "sleepsThroughNight", "sleepDisturbance", "newtemperature", "newbloodPressureSystolic",
                "newbloodPressureDiastolic", "newoxygenSaturation", "newpulse", "newvitalsPain", "newrespiration"
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

            //handling for date fields
            var dateAttributes = ["admissionDate", "birthDate"];

            for (var i = 0; i < dateAttributes.length; ++i) {

                if (new Date(oldData[dateAttributes[i]]).toDateString() !== new Date(newData[dateAttributes[i]]).toDateString()) {

                    diff.push({
                        "field": dateAttributes[i],
                        "old": oldData[dateAttributes[i]],
                        "new": newData[dateAttributes[i]]
                    });
                }
            }

            //handling of nested strings
            var nestedAtributes = [{f:"personalHabits", s:"smokes"}, {f:"personalHabits", s:"alcohol"},
                                  {f: "personalHabits", s:"other"}, {f:"hearing", s:"rightEar"},
                                  {f:"hearing", s:"leftEar"}, {f:"vision", s:"rightEye"},{f:"vision", s:"leftEye"},
                                  {f: "teeth", s:"upperDentureFit"}, {f: "teeth", s:"lowerDentureFit"},
                                  {f: "teeth", s:"upperTeeth"}, {f: "teeth", s:"lowerTeeth"},
                                   {f:"insideApartment", s:"useOfAssistiveDevice"}, {f:"insideApartment", s:"assitanceWithDevice"}, {f:"insideApartment", s:"specialAmbulationNeeds"},
                                  {f:"outsideApartment", s:"useOfAssistiveDevice"}, {f:"outsideApartment", s:"assitanceWithDevice"}, {f:"outsideApartment", s:"specialAmbulationNeeds"}];

            for (var i = 0; i < nestedAtributes.length; ++i) {

                var oldValue = nestedArguments(oldData, nestedAtributes[i].f + "." + nestedAtributes[i].s);

                var newValue = nestedArguments(newData, nestedAtributes[i].f + "." + nestedAtributes[i].s);

                if(oldValue == undefined || newValue == undefined) {
                    continue;
                }

                if (oldValue !== newValue) {

                    diff.push({
                        "field": oldData[nestedAtributes[i].f] + " " +[nestedAtributes[i].s],
                        "old": oldValue,
                        "new": newValue
                    });
                }
            }

            return diff;
        }

        var nestedArguments = function(o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        }
        
        var resetFields = function() {
            vm.formData.newrespiration = "";
            vm.formData.newvitalsPain = "";
            vm.formData.newpulse = "";
            vm.formData.newoxygenSaturation = "";
            vm.formData.newbloodPressureDiastolic = "";
            vm.formData.newbloodPressureSystolic = "";
            vm.formData.newtemperature = "";

            vm.formData.newpsychosocialStatus = "";
            vm.formData.newmedicationAllergies = "";
            vm.formData.newfoodAllergies = "";
        }
        
        var pushNewValues = function() {
            addToArray(vm.formData.respiration, vm.formData.newrespiration);
            addToArray(vm.formData.vitalsPain, vm.formData.newvitalsPain);
            addToArray(vm.formData.pulse, vm.formData.newpulse);
            addToArray(vm.formData.oxygenSaturation, vm.formData.newoxygenSaturation);
            addToArray(vm.formData.bloodPressureDiastolic, vm.formData.newbloodPressureDiastolic);
            addToArray(vm.formData.bloodPressureSystolic, vm.formData.newbloodPressureSystolic);
            addToArray(vm.formData.temperature, vm.formData.newtemperature);

            addToArray(vm.formData.foodAllergies, vm.formData.newfoodAllergies);
            addToArray(vm.formData.medicationAllergies, vm.formData.newmedicationAllergies);

            addToArray(vm.formData.psychosocialStatus, vm.formData.newpsychosocialStatus);

            addToArray(vm.formData.foodLikes, vm.formData.newfoodLikes);
            addToArray(vm.formData.foodDislikes, vm.formData.newfoodDislikes);
        }
        
        
        //when pushing to array make sure we aren't adding invalid data
        function addToArray(arr, value) {

            if (value != undefined) {
                if(value != ""){
                    arr.push(value);
                    return true;
                }
            } else {
                return false;
            }

        }

    }
})();
