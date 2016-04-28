(function ()
{
    'use strict';

    angular.module('app.appointments')
        .controller('EventDetailDialogController', EventDetailDialogController);

    /** @ngInject */
    function EventDetailDialogController($mdDialog, calendarEvent, showEventFormDialog, event)
    {
        var vm = this;

        // Data
        vm.calendarEvent = calendarEvent;

        // Methods
        vm.editEvent = editEvent;
        vm.closeDialog = closeDialog;

        //////////

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
