(function ()
{
    'use strict';

    angular
        .module('app.residents')
        .controller('MailController', MailController);

    /** @ngInject */
    function MailController($scope, $document, $timeout, $mdDialog, $mdMedia,
                  $mdSidenav, Inbox, apilaData, residentsService)
    {
        var vm = this;

        // Data
        vm.accounts = {
            'creapond'    : 'johndoe@creapond.com',
            'withinpixels': 'johndoe@withinpixels.com'
        };
        vm.checked = [];
        vm.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];
        vm.selectedAccount = 'creapond';
        vm.selectedResident = null;
        vm.toggleSidenav = toggleSidenav;

        vm.responsiveReadPane = undefined;
        vm.activeMailPaneIndex = 0;
        vm.dynamicHeight = false;

        vm.scrollPos = 0;
        vm.scrollEl = angular.element('#content');

        vm.inbox = Inbox.data;

        vm.selectedMailShowDetails = false;

        vm.categoryList = ["Administrative",
                           "Allergy",
                           "Bathing",
                           "Continent",
                           "Mobility",
                           "Nutrition",
                           "Pain",
                           "Physical condition",
                           "Psychosocial",
                           "Sleep",
                           "Vitals"];

        // Methods
        vm.checkAll = checkAll;
        vm.closeReadPane = closeReadPane;
        vm.composeDialog = composeDialog;
        vm.isChecked = isChecked;
        vm.replyDialog = replyDialog;
        vm.selectResident = selectResident;
        vm.toggleStarred = toggleStarred;
        vm.toggleCheck = toggleCheck;
        vm.updateResident = updateResident;

        vm.selectedCategory = "Administrative";

        vm.switchCategory = function(category) {
          vm.selectedCategory = category;
        }

       residentsService.getResidentsList().then(function(d) {
         vm.residentList = d.data;
       });


        //////////

        // Watch screen size to activate responsive read pane
        $scope.$watch(function ()
        {
            return $mdMedia('gt-md');
        }, function (current)
        {
            vm.responsiveReadPane = !current;
        });

        // Watch screen size to activate dynamic height on tabs
        $scope.$watch(function ()
        {
            return $mdMedia('xs');
        }, function (current)
        {
            vm.dynamicHeight = current;
        });

        /**
         * Select resident
         *
         * @param resident
         */
        function selectResident(resident)
        {
            console.log(resident);

            vm.selectedResident = resident;

            $timeout(function ()
            {
                // If responsive read pane is
                // active, navigate to it
                if ( angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane )
                {
                    vm.activeMailPaneIndex = 1;
                }

                // Store the current scrollPos
                vm.scrollPos = vm.scrollEl.scrollTop();

                // Scroll to the top
                vm.scrollEl.scrollTop(0);
            });
        }

        /**
         * Close read pane
         */
        function closeReadPane()
        {
            if ( angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane )
            {
                vm.activeMailPaneIndex = 0;

                $timeout(function ()
                {
                    vm.scrollEl.scrollTop(vm.scrollPos);
                }, 650);
            }
        }

        /**
         * Toggle starred
         *
         * @param mail
         * @param event
         */
        function toggleStarred(mail, event)
        {
            event.stopPropagation();
            mail.starred = !mail.starred;
        }

        /**
         * Toggle checked status of the mail
         *
         * @param mail
         * @param event
         */
        function toggleCheck(mail, event)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            var idx = vm.checked.indexOf(mail);

            if ( idx > -1 )
            {
                vm.checked.splice(idx, 1);
            }
            else
            {
                vm.checked.push(mail);
            }
        }

        /**
         * Return checked status of the mail
         *
         * @param mail
         * @returns {boolean}
         */
        function isChecked(mail)
        {
            return vm.checked.indexOf(mail) > -1;
        }

        /**
         * Check all
         */
        function checkAll()
        {
            if ( vm.allChecked )
            {
                vm.checked = [];
                vm.allChecked = false;
            }
            else
            {
                angular.forEach(vm.inbox, function (mail)
                {
                    if ( !isChecked(mail) )
                    {
                        toggleCheck(mail);
                    }
                });

                vm.allChecked = true;
            }
        }

        /**
         * Open compose dialog
         *
         * @param ev
         */
        function composeDialog(ev)
        {
            $mdDialog.show({
                controller         : 'ComposeDialogController',
                controllerAs       : 'vm',
                locals             : {
                    selectedResident: undefined
                },
                templateUrl        : 'app/main/residents/dialogs/compose/compose-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

        /**
         * Open reply dialog
         *
         * @param ev
         */
        function replyDialog(ev)
        {
            $mdDialog.show({
                controller         : 'ComposeDialogController',
                controllerAs       : 'vm',
                locals             : {
                    selectedResident: vm.selectedResident
                },
                templateUrl        : 'app/main/residents/dialogs/compose/compose-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

        function updateResident(ev)
        {
          var cat = vm.selectedCategory;

          if(vm.selectedCategory === "Physical condition") {
            cat = "PhysicalCondition";
          }

          var templateUrl = 'app/main/residents/dialogs/update/update-'
                             + cat + '.html';

            $mdDialog.show({
                controller         : 'UpdateController',
                controllerAs       : 'vm',
                templateUrl        : templateUrl,
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }
    }
})();
