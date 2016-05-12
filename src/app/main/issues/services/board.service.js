(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .factory('BoardService', BoardService);

    /** @ngInject */
    function BoardService($q, msApi, apilaData)
    {
        var service = {
            data        : {},
            addNewBoard : addNewBoard,
            getBoardData: getBoardData,
            getIssueByUsername: getIssueByUsername

        };

        service.list = {
             "data" : [
                {
                    "name": "Open Issues",
                    "uri": "open-issues",
                    "id": "32gfhaf2"
                },
                {
                    "name": "Shelved Issues",
                    "uri": "shelved-issues",
                    "id": "27cfcbe1"
                },
                {
                    "name": "Closed Issues",
                    "uri": "closed-issues",
                    "id": "fg56cbe1"
                }
            ]
        };

        service.name = "";


        //load dummy data at begining
        service.data = {
            "data": {
                "id": "27cfcbe1",
                "name": "ACME Backend Application",
                "uri": "acme-backend-application",
                "settings": {
                    "color": "blue-grey",
                    "subscribed": false,
                    "cardCoverImages": true
                },
                "lists": [
                ],
                "cards": [
                ],
                "members": [
                ],
                "labels": [

                    {
                        "id": "63021cfdbe1x72wcf1fc451v",
                        "name": "Checklist",
                        "checkItemsChecked": 1,
                        "checkItems": [
                            {
                                "name": "Implement a calendar library",
                                "checked": false
                            },
                            {
                                "name": "Replace event colors with Material Design colors",
                                "checked": true
                            },
                            {
                                "name": "Replace icons with Material Design icons",
                                "checked": false
                            },
                            {
                                "name": "Use moment.js",
                                "checked": false
                            }
                        ]
                    }
                ]
            }
        };

      function getIssueByUsername(username) {

        }

        /**
         * Get board data from the server
         *
         * @param boardId
         * @returns {*}
         */
        function getBoardData(boardId)
        {

            console.log("poziva se bord id");
            // Create a new deferred object
            // var deferred = $q.defer();
            //
            // msApi.request('issues.board@get', {id: boardId},
            //
            //     // SUCCESS
            //     function (response)
            //     {
            //         // Attach the data
            //         service.data = response.data;
            //
            //         console.log(response.data);
            //
            //         // Resolve the promise
            //         deferred.resolve(response);
            //     },
            //
            //     // ERROR
            //     function (response)
            //     {
            //         // Reject the promise
            //         deferred.reject(response);
            //     }
            // );
            //
            // return deferred.promise;
        }

        /**
         * Create an empty board object and set it.
         *
         * For the demonstration purposes, we are creating the
         * empty object in the javascript which you wouldn't do
         * it in real life. Rather, you would make an API call
         * to your server to generate an empty object that fills
         * some of the areas for you like an ID, labels, members
         * or the default board settings.
         *
         * Then you would grab the response that comes from
         * the API call and attach it to the service.data object.
         */
        function addNewBoard()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Here you would make an API call to your server...
            _generateEmptyScrumboardObject().then(
                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the response
                    deferred.resolve(response);
                },
                // ERROR
                function (response)
                {
                    // Reject the response
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        /**
         * Dummy function for generating an empty
         * scrumboard object for demonstration
         * purposes
         *
         * @private
         * returns {$promise}
         */
        function _generateEmptyScrumboardObject()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Fake id generator
            var id = parseInt(new Date().valueOf(), 16);

            // Prepare an empty scrumboard object
            var emptyObject = {
                data: {
                    name    : 'Untitled Board',
                    uri     : 'untitled-board',
                    id      : id,
                    settings: {
                        color          : '',
                        subscribed     : false,
                        cardCoverImages: true
                    },
                    lists   : [],
                    cards   : [],
                    members : [
                        {
                            id    : '56027c1930450d8bf7b10758',
                            name  : 'Alice Freeman',
                            avatar: 'assets/images/avatars/alice.jpg'
                        },
                        {
                            id    : '26027s1930450d8bf7b10828',
                            name  : 'Danielle Obrien',
                            avatar: 'assets/images/avatars/danielle.jpg'
                        },
                        {
                            id    : '76027g1930450d8bf7b10958',
                            name  : 'James Lewis',
                            avatar: 'assets/images/avatars/james.jpg'
                        },
                        {
                            id    : '36027j1930450d8bf7b10158',
                            name  : 'Vincent Munoz',
                            avatar: 'assets/images/avatars/vincent.jpg'
                        }
                    ],
                    labels  : [
                        {
                            id   : '26022e4129ad3a5sc28b36cd',
                            name : 'High Priority',
                            color: 'red'
                        },
                        {
                            id   : '56027e4119ad3a5dc28b36cd',
                            name : 'Design',
                            color: 'orange'
                        },
                        {
                            id   : '5640635e19ad3a5dc21416b2',
                            name : 'App',
                            color: 'blue'
                        },
                        {
                            id   : '6540635g19ad3s5dc31412b2',
                            name : 'Feature',
                            color: 'green'
                        }
                    ]
                }
            };

            // Resolve the promise
            deferred.resolve(emptyObject);

            return deferred.promise;
        }

        return service;
    }
})();
