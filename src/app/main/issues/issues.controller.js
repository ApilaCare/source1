(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('ScrumboardController', ScrumboardController);

    /** @ngInject */
    function ScrumboardController($mdSidenav, BoardService, BoardList, CardFilters, $mdDialog, $document)
    {
        var vm = this;

        // Data
        vm.currentView = 'board';
        vm.board = BoardService.data;
        vm.boardList = BoardList.data;
        vm.boardSelectorVisible = false;

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.updateBoardUri = updateBoardUri;
        vm.addIssue = addIssue;
        vm.clearFilters = CardFilters.clear;
        vm.filteringIsOn = CardFilters.isOn;

        ////////

        /**
         * Update Board Uri
         *
         * Once you connect your app to your server,
         * you would do this on your API server.
         */
        function updateBoardUri()
        {
            if ( vm.boardList.getById(vm.board.id) )
            {
                vm.boardList.getById(vm.board.id).name = vm.board.name;
                vm.boardList.getById(vm.board.id).uri = vm.board.uri = encodeURIComponent(vm.board.name).replace(/%20/g, '-').toLowerCase();
            }
        }

        function addIssue(ev) {
          $mdDialog.show({
              controller         : 'CreateIssueController',
              controllerAs       : 'vm',
              locals             : {
                  board: vm.board
              },
              templateUrl        : 'app/main/issues/dialogs/createIssue/createIssue.html',
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

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function (value)
        {
            return this.filter(function (x)
            {
                return x.id === value;
            })[0];
        };

    }
})();
