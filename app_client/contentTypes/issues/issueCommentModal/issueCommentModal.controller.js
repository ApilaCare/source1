(function() {

    angular
        .module('apilaApp')
        .controller('issueCommentModalCtrl', issueCommentModalCtrl);

    issueCommentModalCtrl.$inject = ['$uibModalInstance', 'issueData', 'apilaData'];

    function issueCommentModalCtrl($uibModalInstance, issueData, apilaData) {
        var vm = this;
        vm.issueData = issueData;

        vm.onSubmit = function(type) {
            vm.formError = "";
            if (!vm.formData.commentText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doAddIssueComment(vm.issueData.issueid, vm.formData);

            }
        };

        vm.doAddIssueComment = function(issueid, formData) {
            apilaData.addIssueCommentById(issueid, {
                    commentText: formData.commentText
                })
                .success(function(data) {
                    vm.modal.close(data);
                })
                .error(function(data) {
                    vm.formError = "Your comment has not been saved, please try again";
                });
            return false;
        };

        vm.modal = {
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        };

    }

})();
