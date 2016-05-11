(function ()
{
    'use strict';

    angular
        .module('app.issues', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider,
       msNavigationServiceProvider)
    {
        console.log(msApiProvider.issueCount);

        $stateProvider
            .state('app.issues', {
                abstract : true,
                url      : '/issues',

            })

            // Home
            .state('app.issues.boards', {
                url  : '/boards',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/issues/views/boards/boards-view.html',
                        controller : 'BoardsViewController as vm'
                    }
                }
            })

            // Board
            .state('app.issues.boards.board', {
                    url    : '/:id/:uri',
                    views  : {
                        'content@app'                                  : {
                            templateUrl: 'app/main/issues/issues.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'issuesContent@app.issues.boards.board': {
                            templateUrl: 'app/main/issues/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return {};
                        }
                    }
                }
            )

            // Add board
            .state('app.issues.boards.addBoard', {
                    url    : '/add',
                    views  : {
                        'content@app'                                     : {
                            templateUrl: 'app/main/issues/issues.html',
                            controller : 'ScrumboardController as vm'
                        },
                        'issuesContent@app.issues.boards.addBoard': {
                            templateUrl: 'app/main/issues/views/board/board-view.html',
                            controller : 'BoardViewController as vm'
                        }
                    },
                    resolve: {
                        BoardData: function ($stateParams, BoardService)
                        {
                            return BoardService.addNewBoard();
                        }
                    }
                }
            )

            // Calendar
            .state('app.issues.boards.board.calendar', {
                url  : '/calendar',
                views: {
                    'issuesContent@app.issues.boards.board': {
                        templateUrl: 'app/main/issues/views/calendar/calendar-view.html',
                        controller : 'CalendarViewController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/issues');

        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'ApilaCare',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.issues', {
            title    : 'Issues',
            icon     : 'icon-trello',
            state    : 'app.issues.boards.board',
            badge : {
              content: 0,
              color  : '#F44336'
            },
            weight   : 1
        });
    }



})();
