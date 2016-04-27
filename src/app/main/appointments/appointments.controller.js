(function ()
{
    'use strict';

    angular
        .module('app.appointments')
        .controller('AppointmentsController', AppointmentsController);

    /** @ngInject */
    function AppointmentsController(api, $location, authentication)
    {
        var vm = this;


        if(authentication.getToken() == undefined)
        {
          console.log("Odje");
          $location.path('/auth/login')
        }


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
