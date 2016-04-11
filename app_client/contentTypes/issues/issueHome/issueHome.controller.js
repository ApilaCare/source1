(function () {

  angular
    .module('apilaApp')
    .controller('issueHomeCtrl', issueHomeCtrl);

  issueHomeCtrl.$inject = ['$scope', 'apilaData', 'authentication', '$uibModal'];
  function issueHomeCtrl ($scope, apilaData, authentication, $uibModal) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.pageHeader = {
      title: 'Apila',
      strapline: 'its a website!'
    };
    vm.message = "Checking your location";

    // function parameter for 'community'
      vm.message = "Searching for nearby places";
      apilaData.issuesList()
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No issues found";
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

    vm.popupNewIssueForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/contentTypes/issues/newIssueModal/newIssueModal.view.html',
        controller: 'newIssueModalCtrl as vm'
      });
    };
  }

})();
