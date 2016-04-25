(function ()
{
    'use strict';

    angular
        .module('app.residents', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.residents', {
                url    : '/residents',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/residents/residents.html',
                        controller : 'ResidentsController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/residents');

        // Api
        msApiProvider.register('residents', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ApilaCare',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.residents', {
            title    : 'Residents',
            icon     : 'icon-tile-four',
            state    : 'app.residents',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'RESIDENTS.RESIDENTS_NAV',
            weight   : 1
        });
    }
})();