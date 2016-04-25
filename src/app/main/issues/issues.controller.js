(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('IssuesController', IssuesController);

    /** @ngInject */
    function IssuesController()
    {
        var vm = this;

        console.log("In issues ctrl");
        
        // Data
        vm.helloText = "Hello issues";

        // Methods

        //////////
    }
})();
