(function() {
  'use strict'

  angular.module('app.residents')
         .controller('UpdateController', UpdateController);

  /** @ngInject */
  function UpdateController($mdDialog) {

    var vm = this;

    vm.closeDialog = closeDialog;

    function closeDialog()
    {
        $mdDialog.hide();
    }

  }

})();
