(function() {

  angular
    .module('loc8rApp')
    .service('loc8rData', loc8rData);

  loc8rData.$inject = ['$http', 'authentication'];
  function loc8rData ($http, authentication) {
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

    var appointmentsList = function () {
      return $http.get('/api/appointments');
    };

    var appointmentById = function (appointmentid) {
      return $http.get('/api/appointments/' + appointmentid);
    };

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById,
      issuesList : issuesList,
      issueById : issueById,
      appointmentsList : appointmentsList,
      appointmentById : appointmentById,
    };
  }

})();
