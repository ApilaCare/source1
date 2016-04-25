(function ()
{
    'use strict';

    angular
        .module('app.issues', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.issues', {
                url    : '/issues',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/issues/issues.html',
                        controller : 'IssuesController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/issues');

        // Api
        msApiProvider.register('issues', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ApilaCare',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.issues', {
            title    : 'Issues',
            icon     : 'icon-tile-four',
            state    : 'app.issues',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ISSUES.ISSUES_NAV',
            weight   : 1
        });
    }
})();