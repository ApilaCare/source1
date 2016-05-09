(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('CreateIssueController', CreateIssueController);

    /** @ngInject */
    function CreateIssueController($mdDialog, apilaData, board) {

      var vm = this;

      //Functions
      vm.closeDialog = closeDialog;
      vm.addIssue = addIssue;

      function closeDialog()
      {
          $mdDialog.hide();
      }

      function addIssue() {
        apilaData.addIssue(vm.form)
            .success(function(issue) {

              issue.id = issue._id;
              issue.name = issue.title;
              board.data.cards.push(issue);
              board.data.lists[0].idCards.push(issue.id);

              console.log(vm.board);
              closeDialog();
            })
            .error(function(issue) {
                console.log("Error while adding issue");
            });
      }

    }

})();
