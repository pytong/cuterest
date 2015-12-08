"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$uibModal", "UserService", "ImageService", ($scope, $uibModal, UserService, ImageService) => {

        UserService.loginStatus().get(function(res) {
            $scope.isLoggedIn = res.status;
        });

        $scope.openAddPicModal = () => {
            $scope.errorMessage = "";

            $uibModal.open({
                templateUrl: "/views/addPicModal.html",
                controller: "AddPicModalController",
                scope: $scope
            })
            .result.then((url) => {
                // submit
                ImageService.images()
                    .save({url: url}, (res) => {
                        $(".url-field").val("");
                        if(res.success === false) {
                            $scope.errorMessage = res.result;
                        } else {
                            console.log("Saved " + url);
                        }
                    });
            }, (data) => {
                // dismissed
                $(".url-field").val("");
            });
        }

    }]);
})(app);