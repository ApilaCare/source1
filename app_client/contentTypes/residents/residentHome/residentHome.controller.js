(function() {

    angular
        .module('apilaApp')
        .controller('residentHomeCtrl', residentHomeCtrl);

    residentHomeCtrl.$inject = ['$scope', 'apilaData', '$uibModal', 'authentication'];

    function residentHomeCtrl($scope, apilaData, $uibModal, authentication) {
        var vm = this;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.pageHeader = {
            title: 'Apila',
            strapline: 'its a website!'
        };
        vm.message = "Loading Residents";

        // selceting the views
        vm.views = ['Administrative', 'Bathing', 'Mobility', 'Allergy', 'Sleep', 'Continent', 'Nutrition', 'Physical Condition', 'Psychosocial', 'Pain', 'Vitals'];
        vm.selectedView = vm.views[0];
        vm.selectView = function(name) {
            vm.selectedView = name;
        }

        apilaData.residentsList()
            .success(function(data) {
                vm.message = data.length > 0 ? "" : "No residents were found";

                // appointList defined in common/services/apilaData.service.js
                apilaData.residentList = {
                    residents: data
                };
                vm.data = apilaData.residentList;
            })
            .error(function(e) {
                vm.message = "Sorry, something's gone wrong, please try again later";
            });
        vm.showError = function(error) {
            $scope.$apply(function() {
                vm.message = error.message;
            });
        };

        vm.popupNewResidentForm = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/contentTypes/residents/addResidentModal/addResidentModal.view.html',
                controller: 'addResidentModalCtrl as vm'
            });
        };


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
