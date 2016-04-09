(function () {

  angular
    .module('apilaApp')
    .controller('appointmentHomeCtrl', appointmentHomeCtrl);

  appointmentHomeCtrl.$inject = ['$scope', 'apilaData', '$uibModal', 'authentication', 'exportPdf'];
  function appointmentHomeCtrl ($scope, apilaData, $uibModal, authentication, exportPdf) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.pageHeader = {
      title: 'Apila',
      strapline: 'its a website!'
    };
    vm.message = "Loading Appointments";

    // function parameter for 'community'
      apilaData.appointmentsList()
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No appointments were found";

          apilaData.appointList = { appointments: data };

          vm.data = apilaData.appointList;
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });


    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    // links to common/services/exportPdf.service.js
    vm.exportAppointments = function() {
      // adds the table element
      var elem = $(".printable").clone();
      // currently non-printable = [update button]
      elem.find(".non-printable").remove();

        var printable = elem.get(0);
        var name = new Date().toDateString();
        var header = {name : authentication.currentUser().name};

        exportPdf.exportAppointments(name, printable, header);

    }

    vm.popupNewAppointmentForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/appointments/addAppointmentModal/addAppointmentModal.view.html',
        controller: 'newAppointmentModalCtrl as vm'
      });
    };

    vm.popupUpdateAppointmentForm = function (appointment) {
      var modalInstance = $uibModal.open({
        templateUrl: '/appointments/updateAppointmentModal/updateAppointmentModal.view.html',
        controller: 'updateAppointmentModalCtrl as vm',
        resolve: {
            getAppointment: function() {
              return appointment;
            }
        }
      });
    };
  }

})();
