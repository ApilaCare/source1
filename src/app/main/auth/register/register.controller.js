(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($location, authentication)
    {
        // Data
        var vm = this;

         vm.credentials = {
            name: "",
            email: "",
            password: ""
        };

        // Methods
        vm.register = function() {
            console.log("In register");

            console.log(vm.form);

            vm.credentials.name = vm.form.username;
            vm.credentials.email = vm.form.email;
            vm.credentials.password = vm.form.password;

            vm.doRegister();
        }

        vm.doRegister = function() {
            authentication
                .register(vm.credentials)
                .error(function(err) {
                    vm.formError = err;
                })
                .then(function() {
                    console.log("success register: " + authentication.currentUser().name);
                    $location.path('/auth/login')
                });
        };

        //////////
    }
})();
