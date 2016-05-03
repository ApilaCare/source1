(function() {
  'use strict';

  angular.module('app.appointments')
    .controller('EventFormDialogController', EventFormDialogController);

  /** @ngInject */
  function EventFormDialogController($mdDialog, dialogData, apilaData, authentication) {
    var vm = this;

    // Data
    vm.dialogData = dialogData;

  //  vm.calendarEvent.date = dialogData.start;


    // Methods
    vm.saveEvent = saveEvent;
    vm.closeDialog = closeDialog;

    init();

    //////////

    vm.dayTimeSwitch = "AM";
    vm.showCancel = false;

    //If we are in the add dialog
    if (!vm.dialogData.calendarEvent) {
          vm.transportation = "We are transporting";
          vm.showCancel = true;
      }

         vm.getMatches = function (text) {
             var ret = vm.residentList.filter(function (d) {
                 return d.display.startsWith(text);
             });
             return ret;
         }


    vm.residentList = [];
    vm.selectedUser = {};

    apilaData.residentsList()
      .success(function(residentList) {
        //console.log(residentList);
        vm.residentList = residentList.map(function(elem) {
          return {value: elem._id, display: elem.firstName};
        });
      })
      .error(function(residentList) {
        console.log("Error retriving the list of residents");
      });


      //if we are in the update model set fields value
      if (vm.dialogData.calendarEvent) {

        vm.dayTimeSwitch = vm.calendarEvent.dayTimeSwitch;

        if(vm.dayTimeSwitch == true) {
          vm.dayTimeSwitch = "PM";
        } else {
          vm.dayTimeSwitch = "AM";
        }

        vm.selectedItem = {value: vm.calendarEvent.currentUser._id,
                           display: vm.calendarEvent.currentUser.firstName};

        vm.selectedUser = vm.calendarEvent.currentUser;

      }

    /**
     * Initialize
     */
    function init() {
      vm.dialogTitle = (vm.dialogData.type === 'add' ? 'Add Appointment' : 'Edit Appointment');

      // Edit
      if (vm.dialogData.calendarEvent) {

        vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

        console.log(vm.calendarEvent);

        vm.calendarEvent.reason = vm.calendarEvent.title;
        vm.isCancel = vm.calendarEvent.cancel;
        vm.date = new Date(vm.calendarEvent.date);
        //vm.date.setHours(parseInt(vm.calendarEvent.hours) + parseInt(vm.date.getTimezoneOffset()/60));
        vm.transportation = vm.calendarEvent.transportation;


        // Convert moment.js dates to javascript date object
        if (moment.isMoment(vm.calendarEvent.date)) {
          vm.calendarEvent.date = vm.calendarEvent.date.toDate();
        }

      }
      // Add
      else {
        // Convert moment.js dates to javascript date object
        if (moment.isMoment(vm.dialogData.date)) {

          vm.dialogData.date = vm.dialogData.date.toDate();

        }
        vm.calendarEvent = {
          start: vm.dialogData.start,
          end: vm.dialogData.end
        };


            vm.date = dateToUTC(dialogData.start._d);
            console.log(vm.date);

      }
    }

    function dateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }


    function saveEvent() {

      //set up the date to proper fields before sending to the api
      vm.calendarEvent.transportation = vm.transportation;
      vm.calendarEvent.residentId = vm.selectedItem.value;
      console.log(vm.selectedItem.display);
      vm.calendarEvent.date = vm.date;

      vm.calendarEvent.cancel = vm.isCancel;

      var parseDate = new Date(vm.calendarEvent.date);

      if (vm.dayTimeSwitch === false || vm.dayTimeSwitch === "PM") {
        parseDate.setUTCHours(parseInt(vm.calendarEvent.hours) + 12);
      } else {
        parseDate.setUTCHours(parseInt(vm.calendarEvent.hours));
      }

      parseDate.setMinutes(vm.calendarEvent.minutes);

      vm.calendarEvent.time = parseDate;

      // Update
      if (vm.dialogData.calendarEvent) {

        //update info
        vm.calendarEvent.modifiedBy = authentication.currentUser().name;
        vm.calendarEvent.modifiedDate = new Date();

        var changedFields = checkChangedFields(vm.dialogData.calendarEvent, vm.calendarEvent);

        if(changedFields.length > 0) {
          vm.calendarEvent.updateField = changedFields;
        }

        var srcEvents = [];

        if(vm.calendarEvent.source != undefined) {
          srcEvents = vm.calendarEvent.source.events;
          vm.calendarEvent.source.events.length = 0;
        }


        apilaData.updateAppointment(vm.calendarEvent.appointId, vm.calendarEvent)
          .success(function(appoint) {

            var calId = vm.dialogData.calendarEvent._id;
          //  var residentGoing = vm.dialogData.calendarEvent.residentGoing;



            vm.calendarEvent = appoint;
            vm.calendarEvent.source = srcEvents;
            vm.calendarEvent.residentGoing = appoint.residentGoing;
            vm.calendarEvent.appointId = appoint._id;
            vm.calendarEvent.title = appoint.reason;
            vm.calendarEvent.calId = calId;
            vm.calendarEvent.currentUser = appoint.residentGoing;

            var response = {
              type: vm.dialogData.type,
              calendarEvent: vm.calendarEvent
            };

            $mdDialog.hide(response);

          })
          .error(function(appoint) {
            console.log("Something went wrong while updating the appointments");
          });

      } else { // Add

        apilaData.addAppointment(vm.calendarEvent)
          .success(function(appoint) {

            vm.calendarEvent = appoint;
            vm.calendarEvent.appointId = appoint._id;
            vm.calendarEvent.title = appoint.reason;
            var response = {
              type: vm.dialogData.type,
              calendarEvent: vm.calendarEvent
            };

            $mdDialog.hide(response);
          })
          .error(function(appoint) {
            console.log("Something went wrong with the appointment, try again");
          });
      }

  }



          //checks what fields changed in the updates
        function checkChangedFields(oldData, newData) {
              var d1 = new Date(oldData.date);
              var d2 = newData.date;

              var diff = [];
              var attributeArr = [
                  "reason",
                  "locationName",
                  "locationDoctor",
                  "transportation",
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

              if(d1.getTime() !== d2.getTime()) {
                diff.push({
                  "field": "time",
                  "old": d1,
                  "new": d2
                });
              }

              /* if(oldData["residentGoing"].firstName !== newData["residentGoing"].firstName) {
                   diff.push({
                       "field": "residentGoing",
                       "old": oldData["residentGoing"].firstName,
                       "new": newData["residentGoing"].firstName
                   });
               }*/



              return diff;
          }

    /**
     * Close the dialog
     */
    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();
