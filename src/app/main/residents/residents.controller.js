(function ()
{
    'use strict';

    angular
        .module('app.residents')
        .controller('ResidentsController', ResidentsController);

    /** @ngInject */
    function ResidentsController()
    {
        var vm = this;

        // Data
        vm.helloText = "Hello residents";

        // Methods

        //////////
    }
})();
