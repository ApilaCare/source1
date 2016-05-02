(function ()
{
    'use strict';

    angular
        .module('app.appointments')
        .controller('AppoitmentsController', AppoitmentsController);

    /** @ngInject */
    function AppoitmentsController($mdDialog, $document, apilaData)
    {
        var vm = this;

        // Data
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        //load all the events and show them on the callendar
        apilaData.appointmentsList()
               .success(function(data) {
                 var i = 1;
                   angular.forEach(data, function(value, key) {
                     var dateObj = new Date(value.time);

                     var timeSwitch = false;
                     var hours = dateObj.getUTCHours();

                     if(dateObj.getUTCHours() > 12) {
                       timeSwitch = true;
                       hours -= 12;
                     }

                     var calEvent = {
                       id: i,
                       title: value.reason,
                       start: value.time,
                       end: null,
                       transportation: value.transportation,
                       reason: value.reason,
                       dayTimeSwitch: timeSwitch,
                       minutes: dateObj.getMinutes(),
                       hours: hours,
                       locationDoctor: value.locationDoctor,
                       locationName: value.locationName,
                       date: value.time,
                       currentUser: value.residentGoing,
                       appointId: value._id,
                       cancel: value.cancel,
                       appointmentComment: value.appointmentComment
                     }
                     i++;

                     vm.events[0].push(calEvent);

                   });
               })
               .error(function(e) {
                   console.log("error loading appointments");
               });

        vm.events = [[]];

        vm.calendarUiConfig = {
            calendar: {
                editable          : true,
                eventLimit        : true,
                header            : '',
                handleWindowResize: false,
                aspectRatio       : 1,
                dayNames          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                dayNamesShort     : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                viewRender        : function (view)
                {
                    vm.calendarView = view;
                    vm.calendar = vm.calendarView.calendar;
                    vm.currentMonthShort = vm.calendar.getDate().format('MMM');
                },
                columnFormat      : {
                    month: 'ddd',
                    week : 'ddd D',
                    day  : 'ddd M'
                },
                eventClick        : eventDetail,
                selectable        : true,
                selectHelper      : true,
                select            : select
            }
        };

        // Methods
        vm.addEvent = addEvent;
        vm.next = next;
        vm.prev = prev;

        //////////

        /**
         * Go to next on current view (week, month etc.)
         */
        function next()
        {
            vm.calendarView.calendar.next();
        }

        /**
         * Go to previous on current view (week, month etc.)
         */
        function prev()
        {
            vm.calendarView.calendar.prev();
        }

        /**
         * Show event detail
         *
         * @param calendarEvent
         * @param e
         */
        function eventDetail(calendarEvent, e)
        {
            showEventDetailDialog(calendarEvent, e);
        }

        /**
         * Add new event in between selected dates
         *
         * @param start
         * @param end
         * @param e
         */
        function select(start, end, e)
        {
            showEventFormDialog('add', false, start, end, e);
        }

        /**
         * Add event
         *
         * @param e
         */
        function addEvent(e)
        {
            var start = new Date(),
                end = new Date();

            showEventFormDialog('add', false, start, end, e);
        }

        /**
         * Show event detail dialog
         * @param calendarEvent
         * @param e
         */
        function showEventDetailDialog(calendarEvent, e)
        {
            $mdDialog.show({
                controller         : 'EventDetailDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/appointments/dialogs/event-detail/event-detail-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    calendarEvent      : calendarEvent,
                    showEventFormDialog: showEventFormDialog,
                    event              : e
                }
            });
        }

        /**
         * Show event add/edit form dialog
         *
         * @param type
         * @param calendarEvent
         * @param start
         * @param end
         * @param e
         */
        function showEventFormDialog(type, calendarEvent, start, end, e)
        {
            var dialogData = {
                type         : type,
                calendarEvent: calendarEvent,
                start        : start,
                end          : end
            };

            $mdDialog.show({
                controller         : 'EventFormDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/appointments/dialogs/event-form/event-form-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : e,
                clickOutsideToClose: true,
                locals             : {
                    dialogData: dialogData
                }
            }).then(function (response)
            {

              var dateObj = new Date(response.calendarEvent.time);

              var timeSwitch = false;
              var hours = dateObj.getUTCHours();

              if(dateObj.getUTCHours() > 12) {
                timeSwitch = true;
                hours -= 12;
              }

                if ( response.type === 'add' )
                {

                    // Add new
                    vm.events[0].push({
                        id   : vm.events[0].length + 80,
                        title: response.calendarEvent.title,
                        start: response.calendarEvent.time,
                        end  : null,
                        transportation: response.calendarEvent.transportation,
                        reason: response.calendarEvent.reason,
                        dayTimeSwitch: timeSwitch,
                        minutes: dateObj.getMinutes(),
                        hours: hours,
                        locationDoctor: response.calendarEvent.locationDoctor,
                        locationName: response.calendarEvent.locationName,
                        date: response.calendarEvent.time,
                        currentUser: response.calendarEvent.residentGoing,
                        appointId: response.calendarEvent.appointId,
                        cancel: response.calendarEvent.cancel,
                        appointmentComment: response.calendarEvent.appointmentComment

                    });
                }
                else
                {

                    for ( var i = 0; i < vm.events[0].length; i++ )
                    {
                        // Update
                        if ( vm.events[0][i]._id === response.calendarEvent.calId )
                        {
                          console.log("Updejtovo");

                            vm.events[0][i] = {
                              title: response.calendarEvent.title,
                              start: response.calendarEvent.time,
                              end  : null,
                              transportation: response.calendarEvent.transportation,
                              reason: response.calendarEvent.reason,
                              dayTimeSwitch: timeSwitch,
                              minutes: dateObj.getMinutes(),
                              hours: hours,
                              locationDoctor: response.calendarEvent.locationDoctor,
                              locationName: response.calendarEvent.locationName,
                              date: response.calendarEvent.time,
                              currentUser: response.calendarEvent.currentUser,
                              appointId: response.calendarEvent.appointId,
                              cancel: response.calendarEvent.cancel,
                              appointmentComment: response.calendarEvent.appointmentComment
                            };

                            break;
                        }
                    }
                }
            });
        }

    }

})();
