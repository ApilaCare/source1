(function () {

  angular
    .module('loc8rApp')
    .controller('issueDetailCtrl', issueDetailCtrl);

  issueDetailCtrl.$inject = ['$routeParams', '$location', 'apilaData', 'authentication', '$modal'];
  function issueDetailCtrl ($routeParams, $location, apilaData, authentication, $modal) {
    var vm = this;
    vm.issueid = $routeParams.issueid;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    apilaData.issueById(vm.issueid)
      .success(function(data) {
        vm.data = {issue:data};
        vm.pageHeader = {title:vm.data.issue.title};
      })
      .error(function (e) {
        console.log(e);
      });

      vm.popupIssueCommentForm = function () {
        var modalInstance = $modal.open({
          templateUrl: '/issues/issueCommentModal/issueCommentModal.view.html',
          controller: 'issueCommentModalCtrl as vm',
          resolve : {
            issueData : function () {
              return {
                issueid : vm.issueid,
                issueTitle : vm.data.issue.title
              };
            }
          }
        });

        modalInstance.result.then(function (data) {
          vm.data.issue.comments.push(data);
        });
      };
  }
})();
