(function ()
{
    'use strict';

    angular
        .module('app.residents')
        .controller('ComposeDialogController', ComposeDialogController);

    /** @ngInject */
    function ComposeDialogController($mdDialog, apilaData, residentsService)
    {
        var vm = this;

        // Data

        // Methods
        vm.closeDialog = closeDialog;
        vm.addResident = addResident;

        //////////
        vm.residentList = residentsService.getResidentsList();

        function closeDialog()
        {
            $mdDialog.hide();
        }

        function addResident()
        {

          apilaData.addResident(vm.form)
          .success(function(data) {
                vm.residentList.push(data);
                $mdDialog.hide();
          })
          .error(function() {
            console.log("Error while adding resident");
          });
        }
    }
})();
