(function ()
{
    'use strict';

    angular
        .module('app.locations', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.locations', {
                url    : '/locations',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/locations/locations.html',
                        controller : 'LocationsController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/locations');

        // Api
        msApiProvider.register('locations', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ApilaCare',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.locations', {
            title    : 'Locations',
            icon     : 'icon-tile-four',
            state    : 'app.locations',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'LOCATIONS.LOCATIONS_NAV',
            weight   : 1
        });
    }
})();