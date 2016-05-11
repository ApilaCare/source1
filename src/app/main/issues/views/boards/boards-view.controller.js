(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .controller('BoardsViewController', BoardsViewController);

    /** @ngInject */
    function BoardsViewController(BoardService)
    {
        var vm = this;

        // Data
        //vm.boardList = BoardList.data;
        vm.boardList = BoardService.list.data;

        // Methods

        //////////
    }
})();
