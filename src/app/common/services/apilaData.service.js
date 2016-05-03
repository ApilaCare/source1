(function() {

    angular
        .module('app.core')
        .service('apilaData', apilaData);

    apilaData.$inject = ['$http', 'authentication'];

    function apilaData($http, authentication) {
        var locationByCoords = function(lat, lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
        };

        var apiUrl = "http://localhost:3300";

        var appointList = null;
        var issueList = null;

        var locationById = function(locationid) {
            return $http.get(apiUrl + '/api/locations/' + locationid);
        };

        var addReviewById = function(locationid, data) {
            return $http.post(apiUrl + '/api/locations/' + locationid + '/reviews', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var addLocation = function(data) {
            return $http.post(apiUrl + '/api/locations/', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var issuesList = function() {
            return $http.get(apiUrl + '/api/issues');
        };

        var issueById = function(issueid) {
            return $http.get(apiUrl + '/api/issues/' + issueid);
        };

        //makes a call to the api to add a new issue
        var addIssue = function(data) {
            return $http.post(apiUrl + '/api/issues/new', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        }

        var updateIssue = function(issueid, data) {
            return $http.put(apiUrl + '/api/issues/' + issueid, data);
        }

        var addIssueCommentById = function(issueid, data) {
            return $http.post(apiUrl + '/api/issues/' + issueid + '/comments/new', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var appointmentsList = function() {
            return $http.get(apiUrl + '/api/appointments');
        };

        var appointmentsListByMonth = function(month) {
            return $http.get(apiUrl + '/api/appointments/' +  month);
        };


        var appointmentById = function(appointmentid) {
            return $http.get(apiUrl + '/api/appointments/' + appointmentid);
        };

        //makes a call to the api to add a new appointment
        var addAppointment = function(data) {
            return $http.post(apiUrl + '/api/appointments/new', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        }

        var updateAppointment = function(appointmentid, formData) {
            return $http.put(apiUrl + '/api/appointments/update/' + appointmentid,
                formData);

        };

        var addAppointmentCommentById = function(appointmentid, data) {
            return $http.post(apiUrl + '/api/appointments/' + appointmentid + '/comments/', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        //residents

        var residentsList = function() {
            return $http.get(apiUrl + '/api/residents');
        };

        var addResident = function(data) {
            return $http.post(apiUrl + '/api/residents/new', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var residentById = function(residentid) {
            return $http.get(apiUrl + '/api/residents/' + residentid);
        };

        var updateResident = function(residentid, formData) {
            return $http.put(apiUrl + '/api/residents/update/' + residentid,
                formData);

        };

        return {
            locationByCoords : locationByCoords,
            locationById : locationById,
            addReviewById : addReviewById,
            issuesList : issuesList,
            issueById : issueById,
            addIssue : addIssue,
            addIssueCommentById : addIssueCommentById,
            appointmentsList : appointmentsList,
            appointmentById : appointmentById,
            addAppointment : addAppointment,
            updateAppointment : updateAppointment,
            addAppointmentCommentById : addAppointmentCommentById,
            updateIssue : updateIssue,
            residentsList : residentsList,
            addResident : addResident,
            residentById : residentById,
            updateResident: updateResident,
            appointmentsListByMonth: appointmentsListByMonth
        };
    }

})();
