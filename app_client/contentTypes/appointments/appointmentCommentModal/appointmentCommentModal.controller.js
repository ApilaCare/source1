(function() {

    angular
        .module('apilaApp')
        .controller('appointmentCommentModalCtrl', appointmentCommentModalCtrl);

    appointmentCommentModalCtrl.$inject = ['$uibModalInstance', 'apilaData', 'appointmentData'];

    function appointmentCommentModalCtrl($uibModalInstance, apilaData, appointmentData) {
        var vm = this;


        vm.appointmentData = appointmentData;

        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.formData.commentText) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {

                vm.doAddComment(vm.appointmentData._id, vm.formData);
            }
        };

        vm.doAddComment = function(appointmentid, formData) {
            apilaData.addAppointmentCommentById(appointmentid, formData)
                .success(function(data) {
                    vm.modal.close(data);
                })
                .error(function(data) {
                    vm.formError = "Your review has not been saved, please try again";
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
