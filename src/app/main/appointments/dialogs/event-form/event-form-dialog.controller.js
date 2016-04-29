(function() {
  'use strict';

  angular.module('app.appointments')
    .controller('EventFormDialogController', EventFormDialogController);

  /** @ngInject */
  function EventFormDialogController($mdDialog, dialogData, apilaData) {
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
    vm.transportation = "We are transporting";

    vm.residentList = [];
    vm.selectedUser = {
      name: "Choose a resident",
      id: "-1"
    };

    apilaData.residentsList()
      .success(function(residentList) {
        console.log(residentList);
        vm.residentList = residentList;
      })
      .error(function(residentList) {
        console.log("Error retriving the list of residents");
      });


    /**
     * Initialize
     */
    function init() {
      vm.dialogTitle = (vm.dialogData.type === 'add' ? 'Add Appointment' : 'Edit Appointment');

      // Edit
      if (vm.dialogData.calendarEvent) {
        // Clone the calendarEvent object before doing anything
        // to make sure we are not going to brake the Full Calendar

        vm.dayTimeSwitch = "PM";

        vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

        vm.calendarEvent.reason = vm.calendarEvent.title;
        vm.date = new Date(vm.calendarEvent.date);
        vm.transportation = vm.calendarEvent.transportation;



        vm.currentUser = {id: vm.calendarEvent.currentUser._id,
                          name: vm.calendarEvent.currentUser.firstName};

        console.log(vm.calendarEvent);

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


            vm.date = dialogData.start._d;

      }
    }

    function saveEvent() {

      //set up the date to proper fields before sending to the api
      vm.calendarEvent.transportation = vm.transportation;
      vm.calendarEvent.residentId = vm.selectedUser._id;
      vm.calendarEvent.date = vm.date;

      var parseDate = new Date(vm.calendarEvent.date);

      if (vm.dayTimeSwitch === false || vm.dayTimeSwitch === "PM") {
        parseDate.setHours(parseInt(vm.calendarEvent.hours) + 12);
      } else {
        parseDate.setHours(parseInt(vm.calendarEvent.hours));
      }

      parseDate.setMinutes(vm.calendarEvent.minutes);

      vm.calendarEvent.time = parseDate;


      apilaData.addAppointment(vm.calendarEvent)
        .success(function(appoint) {

          vm.calendarEvent = appoint;
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

    /**
     * Close the dialog
     */
    function closeDialog() {
      $mdDialog.cancel();
    }
  }
})();
