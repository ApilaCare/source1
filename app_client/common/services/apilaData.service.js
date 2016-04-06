(function() {

  angular
    .module('apilaApp')
    .service('apilaData', apilaData);

  apilaData.$inject = ['$http', 'authentication'];
  function apilaData ($http, authentication) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };

    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var addLocation = function (data) {
      return $http.post('/api/locations/', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var issuesList = function () {
      return $http.get('/api/issues');
    };

    var issueById = function (issueid) {
      return $http.get('/api/issues/' + issueid);
    };

    var addIssueCommentById = function (issueid, data) {
      return $http.post('/api/issues/' + issueid + '/comments', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var appointmentsList = function () {
      return $http.get('/api/appointments');
    };

    var appointmentById = function (appointmentid) {
      return $http.get('/api/appointments/' + appointmentid);
    };

    //makes a call to the api to add a new appointment
    var addAppointment = function (data) {
       return $http.post('/api/appointments/new', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
        });
    }

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById,
      issuesList : issuesList,
      issueById : issueById,
      addIssueCommentById : addIssueCommentById,
      appointmentsList : appointmentsList,
      appointmentById : appointmentById,
      addAppointment: addAppointment,
    };
  }

})();
