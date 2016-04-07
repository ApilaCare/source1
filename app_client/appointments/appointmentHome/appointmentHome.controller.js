(function () {

  angular
    .module('apilaApp')
    .controller('appointmentHomeCtrl', appointmentHomeCtrl);

  appointmentHomeCtrl.$inject = ['$scope', 'apilaData', '$uibModal', 'authentication'];
  function appointmentHomeCtrl ($scope, apilaData, $uibModal, authentication) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.pageHeader = {
      title: 'Apila',
      strapline: 'its a website!'
    };
    vm.message = "Checking your location";

    // function parameter for 'community'
      vm.message = "Searching for nearby places";
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

    vm.popupNewAppointmentForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/appointments/addAppointmentModal/addAppointmentModal.view.html',
        controller: 'newAppointmentModalCtrl as vm'
      });
    };

    vm.popupUpdateAppointmentForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/appointments/updateAppointmentModal/updateAppointmentModal.view.html',
        controller: 'updateAppointmentModalCtrl as vm'
      });
    };
  }

})();
