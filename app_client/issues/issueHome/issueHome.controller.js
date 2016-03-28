(function () {

  angular
    .module('loc8rApp')
    .controller('issueHomeCtrl', issueHomeCtrl);

  issueHomeCtrl.$inject = ['$scope', 'loc8rData'];
  function issueHomeCtrl ($scope, loc8rData) {
    var vm = this;
    vm.pageHeader = {
      title: 'Apila',
      strapline: 'its a website!'
    };
    vm.message = "Checking your location";

    // function parameter for 'community'
      vm.message = "Searching for nearby places";
      loc8rData.issuesList()
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { issues: data };
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
  }

})();
