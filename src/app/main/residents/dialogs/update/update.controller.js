(function() {
  'use strict'

  angular.module('app.residents')
         .controller('UpdateController', UpdateController);

  /** @ngInject */
  function UpdateController($mdDialog, currAppointment, apilaData, authentication) {

    var vm = this;

    //filling in old data dor the update
    vm.form = currAppointment;

    //needed unchanged values to compare for updateField
    vm.copyResident = angular.copy(currAppointment);

    vm.form.birthDate = new Date(currAppointment.birthDate);
    vm.form.admissionDate = new Date(currAppointment.admissionDate);

    //Functions
    vm.closeDialog = closeDialog;
    vm.updateResident = updateResident;



    function closeDialog()
    {
        $mdDialog.hide();
    }

    //before sending to server set all the fields and format them correctly
    function formatData() {

      vm.form.modifiedBy = authentication.currentUser().name;
      vm.form.modifiedDate = new Date();

      var changedFields =
              checkChangedFields(vm.copyResident, vm.form);

      if(changedFields.length > 0) {
        vm.form.updateField = changedFields;
      }

    }

    function updateResident() {

        formatData();

        apilaData.updateResident(currAppointment._id, vm.form)
            .success(function(resident) {

              currAppointment.updateInfo.push(
                resident.updateInfo[resident.updateInfo.length-1]);

              pushNewValues();
              resetFields();

              closeDialog();
            })
            .error(function(appoint) {
                console.log("Error while updating resident");
            });
        return false;
    };


        //checks what fields changed in the updates
    function checkChangedFields(oldData, newData) {

        var diff = [];
        var attributeArr = [
            "firstName", "lastName", "middleName", "maidenName", "sex",
            "buildingStatus", "typeOfBathing", "timeOfBathing",
            "frequencyOfBathing", "acceptanceOfBathing", "bowelContinent", "constipated", "laxative",
            "bladderContinent", "dribbles", "catheter", "toiletingDevice", "transfers", "fallRisk",
            "bedReposition", "overallNutrition", "poorNutritionIntervention", "diabetic", "diabeticType",
            "regularBloodSugarMonitoring", "bedtimeSnack", "adaptiveEquipment", "needsFoodInSmallPeices",
            "typeOfDiet", "havePain", "painLocation", "painDescription",
            "maxPainTime", "painIncreasedBy", "painDecreasedBy", "height", "skinCondition", "wearsHearingAid",
            "teethCondition", "psychosocialResponsiveness", "mood", "comprehension",
            "generalActivityParticipation", "diningRoomParticipation", "busRideParticipation",
            "fitnessClassParticipation", "timeInRoom", "preferedActivites", "useFitnessEquipmentIndependently",
            "familyInvolvement", "usualBedtime", "usualArisingTime", "nap", "assistanceToBed",
            "sleepsThroughNight", "sleepDisturbance"
        ];

        var arrayFields = [ "newbloodPressureSystolic",
            "newbloodPressureDiastolic", "newoxygenSaturation", "newpulse", "newvitalsPain", "newrespiration",
            "newfoodAllergies", "newmedicationAllergies", "newpsychosocialStatus", "newtemperature", "newtemperature"
                          ];

        for (var i = 0; i < arrayFields.length; ++i) {

            if (oldData[arrayFields[i]] !== newData[arrayFields[i]]) {

                diff.push({
                    "field": arrayFields[i],
                    "value": newData[arrayFields[i]]
                });
            }
        }

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
        vm.form.newrespiration = "";
        vm.form.newvitalsPain = "";
        vm.form.newpulse = "";
        vm.form.newoxygenSaturation = "";
        vm.form.newbloodPressureDiastolic = "";
        vm.form.newbloodPressureSystolic = "";
        vm.form.newtemperature = "";

        vm.form.newpsychosocialStatus = "";
        vm.form.newmedicationAllergies = "";
        vm.form.newfoodAllergies = "";
        vm.form.newfoodLikes = "";
        vm.form.newfoodDislikes = "";
    };

    var pushNewValues = function() {
        addToArray(vm.form.respiration, vm.form.newrespiration);
        addToArray(vm.form.vitalsPain, vm.form.newvitalsPain);
        addToArray(vm.form.pulse, vm.form.newpulse);
        addToArray(vm.form.oxygenSaturation, vm.form.newoxygenSaturation);
        addToArray(vm.form.bloodPressureDiastolic, vm.form.newbloodPressureDiastolic);
        addToArray(vm.form.bloodPressureSystolic, vm.form.newbloodPressureSystolic);
        addToArray(vm.form.temperature, vm.form.newtemperature);

        addToArray(vm.form.foodAllergies, vm.form.newfoodAllergies);
        addToArray(vm.form.medicationAllergies, vm.form.newmedicationAllergies);

        addToArray(vm.form.psychosocialStatus, vm.form.newpsychosocialStatus);

        addToArray(vm.form.foodLikes, vm.form.newfoodLikes);
        addToArray(vm.form.foodDislikes, vm.form.newfoodDislikes);
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
