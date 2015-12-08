"use strict";

(function(app) {
    app.controller("MainController", ["$scope", "$uibModal", "UserService", function($scope, $uibModal, UserService) {
        $scope.errorMessage = "";

        // UserService.loginStatus().get(function(res) {
        //     $scope.isLoggedIn = res.status;
        // });

        $scope.openAddPicModal = function() {
            $uibModal.open({
                templateUrl: "/views/addPicModal.html",
                controller: "AddPicModalController",
                scope: $scope
            })
            .result.then(function(data) {
                // close
                console.log(data);
            }, function(data) {
                // dismissed
            });
        }

    }]);
})(app);