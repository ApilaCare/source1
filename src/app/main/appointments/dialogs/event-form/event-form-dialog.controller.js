(function() {
  'use strict';

  angular.module('app.appointments')
    .controller('EventFormDialogController', EventFormDialogController);

  /** @ngInject */
  function EventFormDialogController($mdDialog, dialogData, apilaData) {
    var vm = this;

    // Data
    vm.dialogData = dialogData;
    vm.notifications = ['15 minutes before', '30 minutes before', '1 hour before'];

  //  vm.calendarEvent.date = dialogData.start;

    // Methods
    vm.saveEvent = saveEvent;
    vm.closeDialog = closeDialog;

    init();

    //////////


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
        vm.calendarEvent = angular.copy(vm.dialogData.calendarEvent);

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

        console.log(vm.dialogData);

      }
    }

    function saveEvent() {
      apilaData.addAppointment(vm.calendarEvent)
        .success(function(appoint) {
          console.log(appoint);

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
