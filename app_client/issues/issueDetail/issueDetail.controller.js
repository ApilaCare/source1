(function () {

  angular
    .module('loc8rApp')
    .controller('issueDetailCtrl', issueDetailCtrl);

  issueDetailCtrl.$inject = ['$routeParams', '$location', 'loc8rData', 'authentication', '$modal'];
  function issueDetailCtrl ($routeParams, $location, loc8rData, authentication, $modal) {
    var vm = this;
    vm.issueid = $routeParams.issueid;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    loc8rData.issueById(vm.issueid)
      .success(function(data) {
        vm.data = {issue:data};
        vm.pageHeader = {title:vm.data.issue.title};
      })
      .error(function (e) {
        console.log(e);
      });

      vm.popupIssueCommentForm = function () {
        var modalInstance = $modal.open({
          templateUrl: '/issueCommentModal/issueCommentModal.view.html',
          controller: 'issueCommentModalCtrl as vm'
        });
      };
  }
})();
