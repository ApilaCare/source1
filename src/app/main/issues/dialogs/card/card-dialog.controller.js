(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('ScrumboardCardDialogController', ScrumboardCardDialogController);

    /** @ngInject */
    function ScrumboardCardDialogController($document, $mdDialog, fuseTheming, $scope, $timeout,
      fuseGenerator, msUtils, BoardService, cardId, apilaData, authentication, Upload)
    {
        var vm = this;

        // Data
        vm.board = BoardService.data.data;
        vm.card = vm.board.cards.getById(cardId);

        vm.card.labels.map(function(d){d.id = d._id; return d;});

        vm.newLabelColor = 'red';
        vm.members = vm.board.members;

        vm.labels = vm.board.labels;


      vm.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];

        var uploadUrl = 'http://localhost:3300/api/issues/'+ vm.card._id + '/attachments/new';

        if (file) {
            file.upload = Upload.upload({
                url: uploadUrl,
                data: {file: file },
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    vm.card.attachments.push(response.data);
                    console.log(response.data);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
  }

        // Methods
        vm.palettes = fuseTheming.getRegisteredPalettes();
        vm.rgba = fuseGenerator.rgba;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;
        vm.existsMembers = msUtils.existsMembers;
        vm.closeDialog = closeDialog;
        vm.getCardList = getCardList;
        vm.removeCard = removeCard;
        /* Attachment */
        vm.toggleCoverImage = toggleCoverImage;
        vm.removeAttachment = removeAttachment;
        /* Labels */
        vm.labelQuerySearch = labelQuerySearch;
        vm.filterLabel = filterLabel;
        vm.addNewLabel = addNewLabel;
        vm.removeLabel = removeLabel;
        /* Members */
        vm.memberQuerySearch = memberQuerySearch;
        vm.filterMember = filterMember;
        vm.addMembers = addMembers;
        /* Checklist */
        vm.updateCheckedCount = updateCheckedCount;
        vm.addCheckItem = addCheckItem;
        vm.removeChecklist = removeChecklist;
        vm.createCheckList = createCheckList;
        /* Comment */
        vm.addNewComment = addNewComment;
        vm.updateIssue = updateIssue;

        //deleting a member
        vm.memberUpdate = function(selectedMember) {

          console.log(vm.card.idMembers);

          vm.card.deletedMember = selectedMember;

          updateIssue();

        }

        vm.updateLabel = function(labelid) {

          apilaData.updateIssueLabelById(vm.card._id, labelid,
          vm.card.labels.getById(labelid))
          .success(function(d) {

          })
          .error(function(d) {
            console.log("Error updating label");
          });
        }

        vm.selectedItemChange = function(selectedMember) {

          if(selectedMember !== null) {
            updateIssue();
          }
        }

        //load member list
        apilaData.usersList()
            .success(function(d) {
              vm.members = d;
            })
            .error(function(d) {
              console.log("error while loading users");
            });


        //////////

        /**
         * Close Dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

        /**
         * Get Card List
         */
        function getCardList()
        {
            var response;
            for ( var i = 0, len = vm.board.lists.length; i < len; i++ )
            {
                if ( vm.board.lists[i].idCards.indexOf(vm.card.id) > -1 )
                {
                    response = vm.board.lists[i];
                    break;
                }
            }
            return response;
        }

        /**
         * Remove card
         *
         * @param ev
         */
        function removeCard(ev)
        {
            var confirm = $mdDialog.confirm({
                title              : 'Remove Card',
                parent             : $document.find('#issues'),
                textContent        : 'Are you sure want to remove card?',
                ariaLabel          : 'remove card',
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                ok                 : 'Remove',
                cancel             : 'Cancel'
            });

            $mdDialog.show(confirm).then(function ()
            {
                var cardList = getCardList();

                cardList.idCards.splice(cardList.idCards.indexOf(vm.card.id), 1);

                vm.board.cards.splice(vm.board.cards.indexOf(vm.card), 1);

            }, function ()
            {
                // Canceled
            });
        }

        /**
         * Toggle cover image
         *
         * @param attachmentId
         */
        function toggleCoverImage(attachmentId)
        {
            if ( attachmentId === vm.card.idAttachmentCover )
            {
                vm.card.idAttachmentCover = null;
            }
            else
            {
                vm.card.idAttachmentCover = attachmentId;
            }
        }

        /**
         * Remove attachment
         *
         * @param item
         */
        function removeAttachment(item)
        {

            if ( vm.card.idAttachmentCover === item.id )
            {
                vm.card.idAttachmentCover = '';
            }

            apilaData.deleteAttachment(vm.card._id, item._id)
            .success(function(d) {
              vm.card.attachments.splice(vm.card.attachments.indexOf(item), 1);
            })
            .error(function(d) {
              console.log("Error removing attachment");
            });


        }

        /**
         * Add label chips
         *
         * @param query
         * @returns {filterFn}
         */
        function labelQuerySearch(query)
        {
            return query ? vm.labels.filter(createFilterFor(query)) : [];
        }

        /**
         * Label filter
         *
         * @param label
         * @returns {boolean}
         */
        function filterLabel(label)
        {
            if ( !vm.labelSearchText || vm.labelSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(label.name).indexOf(angular.lowercase(vm.labelSearchText)) >= 0;
        }

        /**
         * Add new label
         */
        function addNewLabel()
        {
            var label = {
                id   : msUtils.guidGenerator(),
                name : vm.newLabelName,
                color: vm.newLabelColor,
                author: authentication.currentUser().name
            };

            //send data to the api
            apilaData.addIssueLabelById(vm.card._id, label)
            .success(function(data) {
              data.id = data._id;
              vm.card.labels.push(data);

              vm.newLabelName = '';

            })
            .error(function(data) {
              console.log("Error while adding label");
            });

        }

        /**
         * Remove label
         */
        function removeLabel(id)
        {
            var arr = vm.board.labels;
            arr.splice(arr.indexOf(arr.getById(vm.editLabelId)), 1);

            console.log(id);

            apilaData.deleteIssueLabelById(vm.card._id, id._id)
            .success(function(d) {

              angular.forEach(vm.board.cards, function (card)
              {
                  if ( card.idLabels && card.idLabels.indexOf(vm.editLabelId) > -1 )
                  {
                      card.idLabels.splice(card.idLabels.indexOf(vm.editLabelId), 1);
                  }
              });

            })
            .error(function() {
              console.log("Error while deleting label");
            });



            vm.newLabelName = '';
        }

        /**
         * Add member chips
         *
         * @param query
         * @returns {Array}
         */
        function memberQuerySearch(query)
        {
            return query ? vm.members.filter(createFilterFor(query)) : [];
        }

        /**
         * Member filter
         *
         * @param member
         * @returns {boolean}
         */
        function filterMember(member)
        {
            if ( !vm.memberSearchText || vm.memberSearchText === '' )
            {
                return true;
            }

            return angular.lowercase(member.name).indexOf(angular.lowercase(vm.memberSearchText)) >= 0;
        }

        function addMembers(item, array) {

          console.log(item);

            msUtils.toggleInMembersArray(item, array);

            updateIssue();

        }

        /**
         * Update check list stats
         * @param list
         */
        function updateCheckedCount(list)
        {
            var checkItems = list.checkItems;
            var checkedItems = 0;
            var allCheckedItems = 0;
            var allCheckItems = 0;

            angular.forEach(checkItems, function (checkItem)
            {
                if ( checkItem.checked )
                {
                    checkedItems++;
                }
            });

            list.checkItemsChecked = checkedItems;

            angular.forEach(vm.card.checklists, function (item)
            {
                allCheckItems += item.checkItems.length;
                allCheckedItems += item.checkItemsChecked;
            });

            vm.card.checkItems = allCheckItems;
            vm.card.checkItemsChecked = allCheckedItems;

            apilaData.updateCheckList(vm.card._id, list._id, list)
            .success(function(d) {

            })
            .error(function() {
              console.log("Error while updateing checklist");
            });
        }

        /**
         * Add checklist item
         *
         * @param text
         * @param checkList
         */
        function addCheckItem(text, checkList)
        {
            if ( !text || text === '' )
            {
                return;
            }

            var newCheckItem = {
                'name'   : text,
                'checked': false
            };

            checkList.checkItems.push(newCheckItem);
            console.log(checkList);

            apilaData.updateCheckList(vm.card._id, checkList._id, checkList)
            .success(function(d) {

                updateCheckedCount(checkList);

            })
            .error(function() {
              console.log("Error while updateing checklist");
            });

        }

        /**
         * Remove checklist
         *
         * @param item
         */
        function removeChecklist(item)
        {
            //send remove request to the api
            apilaData.deleteCheckList(vm.card._id, item._id)
            .success(function(d) {
              vm.card.checklists.splice(vm.card.checklists.indexOf(item), 1);

              angular.forEach(vm.card.checklists, function (list)
              {
                  updateCheckedCount(list);
              });
            })
            .error(function(d){
              console.log("Error while removing checklist");
            });

        }

        /**
         * Create checklist
         */
        function createCheckList()
        {

            var data = {
                id               : msUtils.guidGenerator(),
                name             : vm.newCheckListTitle,
                checklistName    : vm.newCheckListTitle,
                checkItemsChecked: 0,
                checkItems       : []
            };

            vm.newCheckListTitle = '';

            apilaData.addCheckList(vm.card._id, data)
            .success(function(d) {
                vm.card.checklists.push(d);
                console.log(vm.card.checklists);
            })
            .error(function(d) {
              console.log("Error while adding checklist");
            });
        }

        /**
         * Add new comment
         *
         * @param newCommentText
         */
        function addNewComment(newCommentText)
        {
            //send the comment to the api

            console.log(vm.card);

            var issueid = vm.card._id;

            var commentData = {
              commentText: newCommentText,
              author: authentication.currentUser().name
            };

            apilaData.addIssueCommentById(issueid, commentData)
            .success(function(data) {
              console.log(data);

              var newComment = {
                  idMember: '',
                  commentText : newCommentText,
                  author    : data.author
              };

              vm.card.comments.unshift(newComment);

            }).error(function(data) {
              console.log("Error while adding comment");
            });


        }

        var oldData = angular.copy(vm.card);

        function updateIssue() {

          vm.card.title = vm.card.name;

          //add updateInfo Data
          vm.card.modifiedBy = authentication.currentUser().name;
          vm.card.modifiedDate = new Date();

          vm.card.updateField = checkChangedFields(oldData, vm.card);

          apilaData.updateIssue(vm.card._id, vm.card)
          .success(function(data) {
            console.log("updated issue");


          }).error(function(data) {
            console.log("Error while adding comment");
          });
        }


        function checkChangedFields(oldData, newData) {

          console.log(oldData);
          console.log(newData);

           var diff = [];
           var attributeArr = ["title", "resolutionTimeframe", "description"];

           for (var i = 0; i < attributeArr.length; ++i) {

               if (oldData[attributeArr[i]] !== newData[attributeArr[i]]) {

                   diff.push({
                       "field": attributeArr[i],
                       "old": oldData[attributeArr[i]],
                       "new": newData[attributeArr[i]]
                   });
               }
           }

           var memDiff = null;

           //member updates, deleted
           if(oldData.idMembers.length > newData.idMembers.length) {
             memDiff = _.differenceBy(oldData.idMembers,
                  newData.idMembers, "name");

             if(memDiff.length > 0) {
               diff.push({
                 "field" : "idMemebers",
                 "old" : memDiff[0].name,
                 "new" : ""
               });
             }
           }
           //added some member
           else if(oldData.idMembers.length < newData.idMembers.length) {
             memDiff = _.differenceBy(newData.idMembers,
                  oldData.idMembers, "name");

             if(memDiff.length > 0) {
               diff.push({
                 "field" : "idMemebers",
                 "old" : "",
                 "new" : memDiff[0].name
               });
             }
         }

           return diff;
       }


        /**
         * Filter for chips
         *
         * @param query
         * @returns {filterFn}
         */
        function createFilterFor(query)
        {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item)
            {
                return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
            };
        }
    }
})();
