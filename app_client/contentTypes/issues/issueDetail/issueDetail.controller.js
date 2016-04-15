(function () {

  angular
    .module('apilaApp')
    .controller('issueDetailCtrl', issueDetailCtrl);

  issueDetailCtrl.$inject = ['$routeParams', '$location', 'apilaData', 'authentication', '$uibModal', 'wordCloud'];
  function issueDetailCtrl ($routeParams, $location, apilaData, authentication, $uibModal, wordCloud) {
    var vm = this;
    vm.issueid = $routeParams.issueid;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    apilaData.issueById(vm.issueid)
      .success(function(data) {
        vm.data = {issue:data};
        vm.pageHeader = {title:vm.data.issue.title};

        // console.log(createWordArray(vm.data));

        wordCloud.drawWordCloud(createWordArray(vm.data));
      })
      .error(function (e) {
        console.log(e);
      });

      vm.popupIssueCommentForm = function () {
        var modalInstance = $uibModal.open({
          templateUrl: '/contentTypes/issues/issueCommentModal/issueCommentModal.view.html',
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


       vm.popupUpdateIssueForm = function (issue) {
          var modalInstance = $uibModal.open({
            templateUrl: '/contentTypes/issues/addIssueModal/addIssueModal.view.html',
            controller: 'newIssueModalCtrl as vm',
            resolve: {
            getIssue: function() {
              return issue;
            }
            }
          });
        };


      // gets all the comments and issue description and converts them to word array
      function createWordArray(data) {

          var commentText;
          for (var i = 0; i < data.issue.comments.length; ++i) {
              commentText += " " + data.issue.comments[i].commentText;
          }

          commentText += " " + data.issue.description;

          return commentText.split(" ");

      }

  }
})();
