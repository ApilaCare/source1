(function() {

    angular
        .module('apilaApp')
        .controller('residentDetailCtrl', residentDetailCtrl);

    residentDetailCtrl.$inject = ['$routeParams', '$location', 'apilaData', 'authentication', '$uibModal', 'exportPdf'];

    function residentDetailCtrl($routeParams, $location, apilaData, authentication, $uibModal, exportPdf) {
        var vm = this;
        vm.residentid = $routeParams.residentid;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();



        apilaData.residentById(vm.residentid)
            .success(function(data) {
                vm.data = {
                    resident : data
                };

                vm.pageHeader = {
                    title: vm.data.resident.firstName + " " + vm.data.resident.lastName + "'s Details Page",
                };
            })
            .error(function(e) {
                console.log(e);
            });

        vm.popupUpdateResidentForm = function(resident) {
            var modalInstance = $uibModal.open({
                templateUrl: '/contentTypes/residents/updateResidentModal/updateResidentModal.view.html',
                controller: 'updateResidentModalCtrl as vm',
                resolve: {
                    getResident: function() {
                        return resident;
                    }
                }
            });
        };

    }

})();
