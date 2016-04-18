(function() {

    angular
        .module('apilaApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'apilaData', 'authentication'];

    function locationDetailCtrl($routeParams, $location, $uibModal, apilaData, authentication) {
        var vm = this;
        vm.locationid = $routeParams.locationid;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();

        apilaData.locationById(vm.locationid)
            .success(function(data) {
                vm.data = {
                    location: data
                };
                vm.pageHeader = {
                    title: vm.data.location.name
                };
            })
            .error(function(e) {
                console.log(e);
            });

        vm.popupReviewForm = function() {
            var modalInstance = $uibModal.open({
                templateUrl: '/contentTypes/locations/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve: {
                    locationData: function() {
                        return {
                            locationid: vm.locationid,
                            locationName: vm.data.location.name
                        };
                    }
                }
            });

            modalInstance.result.then(function(data) {
                vm.data.location.reviews.push(data);
            });
        };

    }

})();
