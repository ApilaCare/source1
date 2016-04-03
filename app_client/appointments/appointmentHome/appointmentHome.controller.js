(function () {

  angular
    .module('loc8rApp')
    .controller('appointmentHomeCtrl', appointmentHomeCtrl);

  appointmentHomeCtrl.$inject = ['$scope', 'apilaData', '$modal'];
  function appointmentHomeCtrl ($scope, apilaData, $modal) {
    var vm = this;
    vm.pageHeader = {
      title: 'Apila',
      strapline: 'its a website!'
    };
    vm.message = "Checking your location";

    // function parameter for 'community'
      vm.message = "Searching for nearby places";
      apilaData.appointmentsList()
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { appointments: data };
          console.log(vm.data);
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
      var modalInstance = $modal.open({
        templateUrl: '/appointments/addAppointmentModal/addAppointmentModal.view.html',
        controller: 'newAppointmentModalCtrl as vm'
      });
    };
  }

})();
