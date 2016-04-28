(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Appoitments
            'app.appointments',

            // Residents
            'app.residents',

            // Issues
            'app.issues',

            // Login
            'app.pages.auth.login',

            // Register
            'app.pages.auth.register',

        ]);
})();
