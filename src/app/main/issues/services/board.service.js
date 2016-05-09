(function ()
{
    'use strict';

    angular
        .module('app.issues')
        .factory('BoardService', BoardService);

    /** @ngInject */
    function BoardService($q, msApi)
    {
        var service = {
            data        : {},
            addNewBoard : addNewBoard,
            getBoardData: getBoardData
        };

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
                    {
                        "id": "56027cf5a2ca3839a5d36103",
                        "name": "Designs",
                        "idCards": [
                            "5603a2a3cab0c8300f6096b3"
                        ]
                    },
                    {
                        "id": "56127cf2a2ca3539g7d36103",
                        "name": "Development",
                        "idCards": [
                            "5637273da9b93bb84743a0f9"
                        ]
                    }
                ],
                "cards": [
                    {
                        "id": "5603a2a3cab0c8300f6096b3",
                        "name": "Calendar App Design",
                        "description": "",
                        "idAttachmentCover": "56027cfcbe1b72ecf1fc452a",
                        "idMembers": [
                            "56027c1930450d8bf7b10758",
                            "36027j1930450d8bf7b10158"
                        ],
                        "idLabels": [
                            "56027e4119ad3a5dc28b36cd",
                            "5640635e19ad3a5dc21416b2"
                        ],
                        "attachments": [
                            {
                                "id": "56027cfcbe1b72ecf1fc452a",
                                "name": "calendar-app-design.jpg",
                                "src": "assets/images/scrumboard/calendar-app-design.jpg",
                                "time": "Added Nov 1 at 12:34PM",
                                "type": "image"
                            },
                            {
                                "id": "67027cahbe3b52ecf2dc631c",
                                "url": "assets/images/scrumboard/calendar-app-design.jpg",
                                "time": "Added Nov 3 at 15:22AM",
                                "type": "link"
                            }
                        ],
                        "subscribed": true,
                        "checklists": [
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
                            },
                            {
                                "name": "Checklist 2",
                                "id": "74031cfdbe1x72wcz1dc166z",
                                "checkItemsChecked": 1,
                                "checkItems": [
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
                        ],
                        "checkItems": 7,
                        "checkItemsChecked": 2,
                        "comments": [
                            {
                                "idMember": "56027c1930450d8bf7b10758",
                                "message": "We should be able to add moment.js without any problems",
                                "time": "12 mins. ago"
                            },
                            {
                                "idMember": "36027j1930450d8bf7b10158",
                                "message": "I added a link for a page that might help us deciding the colors",
                                "time": "30 mins. ago"
                            }
                        ],
                        "activities": [
                            {
                                "idMember": "56027c1930450d8bf7b10758",
                                "message": "added a comment",
                                "time": "12 mins. ago"
                            },
                            {
                                "idMember": "36027j1930450d8bf7b10158",
                                "message": "added a comment",
                                "time": "30 mins. ago"
                            },
                            {
                                "idMember": "36027j1930450d8bf7b10158",
                                "message": "attached a link",
                                "time": "45 mins. ago"
                            }
                        ],
                        "due": null
                    },
                    {
                        "id": "5637273da9b93bb84743a0f9",
                        "name": "Fix Splash Screen bugs",
                        "description": "",
                        "idAttachmentCover": "5603a2ae2bbd55bb2db57478",
                        "idMembers": [
                            "56027c1930450d8bf7b10758"
                        ],
                        "idLabels": [],
                        "attachments": [
                            {
                                "id": "5603a2ae2bbd55bb2db57478",
                                "name": "mail-app-design.jpg",
                                "src": "assets/images/scrumboard/mail-app-design.jpg",
                                "time": "Added Nov 1 at 12:34PM",
                                "type": "image"
                            }
                        ],
                        "subscribed": true,
                        "checklists": [],
                        "checkItems": 0,
                        "checkItemsChecked": 0,
                        "comments": [],
                        "activities": [],
                        "due": null
                    }
                ],
                "members": [
                    {
                        "id": "56027c1930450d8bf7b10758",
                        "name": "Alice Freeman",
                        "avatar": "assets/images/avatars/alice.jpg"
                    },
                    {
                        "id": "26027s1930450d8bf7b10828",
                        "name": "Danielle Obrien",
                        "avatar": "assets/images/avatars/danielle.jpg"
                    },
                    {
                        "id": "76027g1930450d8bf7b10958",
                        "name": "James Lewis",
                        "avatar": "assets/images/avatars/james.jpg"
                    },
                    {
                        "id": "36027j1930450d8bf7b10158",
                        "name": "Vincent Munoz",
                        "avatar": "assets/images/avatars/vincent.jpg"
                    }
                ],
                "labels": [
                    {
                        "id": "56027e4119ad3a5dc28b36cd",
                        "name": "Design",
                        "color": "red"
                    },
                    {
                        "id": "5640635e19ad3a5dc21416b2",
                        "name": "App",
                        "color": "blue"
                    },
                    {
                        "id": "6540635g19ad3s5dc31412b2",
                        "name": "Feature",
                        "color": "green"
                    }
                ]
            }
        };

        /**
         * Get board data from the server
         *
         * @param boardId
         * @returns {*}
         */
        function getBoardData(boardId)
        {
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('issues.board@get', {id: boardId},

                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    console.log(response.data);

                    // Resolve the promise
                    deferred.resolve(response);
                },

                // ERROR
                function (response)
                {
                    // Reject the promise
                    deferred.reject(response);
                }
            );

            return deferred.promise;
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
