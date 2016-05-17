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

        var issuesList = function(status) {
            return $http.get(apiUrl + '/api/issues/list/' + status);
        };

        var issueById = function(issueid) {
            return $http.get(apiUrl + '/api/issues/' + issueid);
        };

        var listIssueByUsername = function(username, status) {
          console.log("List users");
          return $http.get(apiUrl + '/api/issues/' + username + "/s/" + status);
        }

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

        var deleteIssueLabelById = function(issueid, labelid) {
          return $http.delete(apiUrl + '/api/issues/' + issueid + '/labels/' + labelid, {
          headers: {
              Authorization: 'Bearer ' + authentication.getToken()
          }
        });
        }

        var updateIssueLabelById = function(issueId, labelid, data) {
          return $http.put(apiUrl + '/api/issues/' + issueId + '/labels/' + labelid, data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
          });
        }

        var addIssueCommentById = function(issueid, data) {
            return $http.post(apiUrl + '/api/issues/' + issueid + '/comments/new', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var addIssueLabelById = function(issueid, data) {
            return $http.post(apiUrl + '/api/issues/' + issueid + '/labels/new', data, {
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

        var usersList = function() {
          return $http.get(apiUrl + '/api/users');
        }

        var addCheckList = function(issueid, data) {
          return $http.post(apiUrl + '/api/issues/'+ issueid + '/checklists/new', data, {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
        }

        var issueLabelList = function(issueid, labelid) {

        }

        var updateCheckList = function(issueid, checklistid, data) {
            return $http.put(apiUrl + '/api/issues/' + issueid + '/checklists/' + checklistid,
                data,   {headers: {
                      Authorization: 'Bearer ' + authentication.getToken()
                  }});

        };


        var deleteCheckList = function(issueid, checklistid) {
          return $http.delete(apiUrl + '/api/issues/' + issueid + '/checklists/' + checklistid, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
          });
        }

        var deleteAttachment = function(issueid, attachmentid, data) {
          return $http.delete(apiUrl + '/api/issues/' + issueid + '/attachments/' + attachmentid, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
          });
        }

        var updateIssue = function(issueid, data) {
          return $http.put(apiUrl + '/api/issues/' + issueid, data, {
              headers: {
                  Authorization: 'Bearer ' + authentication.getToken()
              }
          });
        }

        var openIssuesCount = function(username) {
          return $http.get(apiUrl + '/api/issues/count/' + username);
        }

        var deleteIssue = function(issueid) {
          return $http.delete(apiUrl + '/api/issues/' + issueid, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
          });
        }

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
            appointmentsListByMonth: appointmentsListByMonth,
            listIssueByUsername: listIssueByUsername,
            usersList : usersList,
            addIssueLabelById : addIssueLabelById,
            deleteIssueLabelById: deleteIssueLabelById,
            updateIssueLabelById: updateIssueLabelById,
            issueLabelList: issueLabelList,
            addCheckList : addCheckList,
            updateCheckList: updateCheckList,
            deleteCheckList: deleteCheckList,
            deleteAttachment: deleteAttachment,
            updateIssue: updateIssue,
            openIssuesCount : openIssuesCount,
            deleteIssue : deleteIssue
        };
    }

})();
