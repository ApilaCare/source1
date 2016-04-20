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

        vm.formData.newrespiration = vm.formData.respiration[vm.formData.respiration.length - 1];
        vm.formData.newvitalsPain = vm.formData.vitalsPain[vm.formData.vitalsPain.length - 1];
        vm.formData.newpulse = vm.formData.pulse[vm.formData.pulse.length - 1];
        vm.formData.newoxygenSaturation = vm.formData.oxygenSaturation[vm.formData.oxygenSaturation.length - 1];
        vm.formData.newbloodPressureDiastolic = vm.formData.bloodPressureDiastolic[vm.formData.bloodPressureDiastolic.length - 1];
        vm.formData.newbloodPressureSystolic = vm.formData.bloodPressureSystolic[vm.formData.bloodPressureSystolic.length - 1];
        vm.formData.newtemperature = vm.formData.temperature[vm.formData.temperature.length - 1];

        vm.formData.newpsychosocialStatus = vm.formData.psychosocialStatus[vm.formData.psychosocialStatus.length - 1];
        vm.formData.newmedicationAllergies = vm.formData.medicationAllergies[vm.formData.medicationAllergies.length - 1];
        vm.formData.newfoodAllergies = vm.formData.foodAllergies[vm.formData.foodAllergies.length - 1];

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
                "firstName", "lastName", "middleName", "maidenName", "birthDate", "sex", "admissionDate",
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

            //handling of nested strings

            var nestedAtributes = [{f:"personalHabits", s:"smokes"}, {f:"personalHabits", s:"alcohol"},
                                  {f: "personalHabits", s:"other"}, {f:"hearing", s:"rightEar"},
                                  {f:"hearing", s:"leftEar"}, {f:"vision", s:"rightEye"},{f:"vision", s:"leftEye"},
                                  {f: "teeth", s:"upperDentureFit"}, {f: "teeth", s:"lowerDentureFit"},
                                  {f: "teeth", s:"upperTeeth"}, {f: "teeth", s:"lowerTeeth"},
                                   {f:"insideApartment", s:"useOfAssistiveDevice"}, {f:"insideApartment", s:"assitanceWithDevice"}, {f:"insideApartment", s:"specialAmbulationNeeds"},
                                  {f:"outsideApartment", s:"useOfAssistiveDevice"}, {f:"outsideApartment", s:"assitanceWithDevice"}, {f:"outsideApartment", s:"specialAmbulationNeeds"}];


            /*
            for (var i = 0; i < nestedAtributes.length; ++i) {
                if (oldData[nestedAtributes[i].f][nestedAtributes[i].s] !== newData[nestedAtributes[i].f][nestedAtributes[i].s]) {

                    diff.push({
                        "field": oldData[nestedAtributes[i].f] + " " +[nestedAtributes[i].s],
                        "old": oldData[nestedAtributes[i].f][nestedAtributes[i].s],
                        "new": newData[nestedAtributes[i].f][nestedAtributes[i].s]
                    });
                }
            }*/

            return diff;
        }

    }
})();
