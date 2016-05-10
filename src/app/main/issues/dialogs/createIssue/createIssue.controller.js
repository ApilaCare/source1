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

      vm.getMatches = function (text) {
        if(text === null) {
          return;
        }
        var textLower = text.toLowerCase();

          var ret = vm.residentList.filter(function (d) {
              if(d.display != null)
              return d.display.toLowerCase().indexOf(text) > -1;
          });
          return ret;
      }


     vm.residentList = [];
     vm.selectedUser = {};

     apilaData.residentsList()
       .success(function(residentList) {
         //console.log(residentList);
         vm.residentList = residentList.map(function(elem) {
           return {value: elem.firstName + " " + elem.lastName, display: elem.firstName + " " + elem.lastName};
         });
       })
       .error(function(residentList) {
         console.log("Error retriving the list of residents");
       });

      function addIssue() {

        vm.form.responsibleParty = vm.selectedItem.value;

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
