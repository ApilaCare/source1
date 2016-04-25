(function ()
{
    'use strict';

    angular
        .module('app.appointments', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.appointments', {
                url    : '/appointments',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/appointments/appointments.html',
                        controller : 'AppointmentsController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/appointments');

        // Api
        msApiProvider.register('appointments', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ApilaCare',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.appointments', {
            title    : 'Appointments',
            icon     : 'icon-tile-four',
            state    : 'app.appointments',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'APPOINT.APPOINT_NAV',
            weight   : 1
        });
    }
})();