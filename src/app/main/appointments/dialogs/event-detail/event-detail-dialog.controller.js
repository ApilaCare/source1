(function ()
{
    'use strict';

    angular.module('app.appointments')
        .controller('EventDetailDialogController', EventDetailDialogController);

    /** @ngInject */
    function EventDetailDialogController($mdDialog, calendarEvent, showEventFormDialog, event, apilaData, exportPdf)
    {
        var vm = this;

        // Data
        vm.calendarEvent = calendarEvent;

        console.log(vm.calendarEvent);

        // Methods
        vm.editEvent = editEvent;
        vm.closeDialog = closeDialog;

        //////////

        vm.submitComment = function() {
          apilaData.addAppointmentCommentById(vm.calendarEvent.appointId, vm.formData)
              .success(function(data) {
                  console.log("Comment has been aded");
                  vm.calendarEvent.appointmentComment.push(data);
                  vm.formData.commentText = "";
              })
              .error(function(data) {
                  console.log("Error while adding comments");
              });
        }

    vm.exportAppointment = function() {

        console.log("export");

         var name = vm.calendarEvent.residentGoing.firstName + " to " + vm.calendarEvent.locationName;
         //vm.calendarEvent.appointment = vm.calendarEvent;
         exportPdf.exportAppointmentDetail(name, vm.calendarEvent);
     }

        function closeDialog()
        {
            $mdDialog.hide();
        }

        function editEvent(calendarEvent)
        {
            showEventFormDialog('edit', calendarEvent, false, false, event);
        }
    }
})();
