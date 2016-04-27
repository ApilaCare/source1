(function ()
{
    'use strict';

    angular
        .module('app.appointments')
        .controller('AppointmentsController', AppointmentsController);

    /** @ngInject */
    function AppointmentsController(api)
    {
        var vm = this;

        // Data
        vm.helloText = "Hello appoitments";

        // Methods
        
        api.getTestCall.get({},
            // Success
            function (response)
            {
                console.log(response);
            },
            // Error
            function (response)
            {
                console.error(response);
            }
    );        
        //////////
    }
})();
