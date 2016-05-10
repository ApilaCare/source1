(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('CreateIssueController', CreateIssueController);

    /** @ngInject */
    function CreateIssueController($mdDialog, apilaData, board, name) {

      var vm = this;

      //Functions
      vm.closeDialog = closeDialog;
      vm.addIssue = addIssue;

      if(name != null) {
        vm.selectedItem = {value: name,
                           display: name
                             };
      }

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

     apilaData.usersList()
       .success(function(usersList) {
         vm.residentList = usersList.map(function(elem) {
           return {value: elem.name, display: elem.name};
         });
       })
       .error(function(usersList) {
         console.log("Error retriving the list of residents");
       });

      function addIssue() {

        vm.form.responsibleParty = vm.selectedItem.value;

        apilaData.addIssue(vm.form)
            .success(function(issue) {

              issue.id = issue._id;
              issue.name = issue.title;

              if(board.data === undefined) {
                board.data = board;
              }

              board.data.cards.push(issue);


              for(var i = 0; i < board.data.lists.length;++i) {
                if(board.data.lists[i].name === issue.responsibleParty) {
                  board.data.lists[i].idCards.push(issue.id);
                  break;
                }

              }


              closeDialog();
            })
            .error(function(issue) {
                console.log("Error while adding issue");
            });
      }

      function findListByName(name, id) {
        angular.forEach(board.data.lists, function(v, k) {
          if(v.name === name){
            v.idCards.push(id);
            return;
          }
        });
      }

    }

})();
