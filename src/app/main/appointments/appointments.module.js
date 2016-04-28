(function ()
{
    'use strict';

    angular
        .module('app.appointments', [
            'ui.calendar'
        ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.appointments', {
            url      : '/appointments',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/appointments/appointments.html',
                    controller : 'AppoitmentsController as vm'
                }
            },
        //    bodyClass: 'calendar'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/appointments');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse.appointments', {
            title : 'appointments',
            icon  : 'icon-calendar-today',
            state : 'app.appointments',
            weight: 1
        });
    }
})();
