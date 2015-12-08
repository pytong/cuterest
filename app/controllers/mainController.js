"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$uibModal", "UserService", "ImageService", ($scope, $uibModal, UserService, ImageService) => {
        $scope.errorMessage = "";

        $scope.openAddPicModal = () => {
            $uibModal.open({
                templateUrl: "/views/addPicModal.html",
                controller: "AddPicModalController",
                scope: $scope
            })
            .result.then((url) => {
                // submit
                let encodedUrl = encodeURIComponent(url);
                ImageService.images()
                    .save({url: encodedUrl}, (res) => {
                        $(".url-field").val("");
                        if(res.success === false) {
                            $scope.errorMessage = res.result;
                        } else {
                            console.log("Saved " + encodedUrl);
                        }
                    });
            }, (data) => {
                // dismissed
                $(".url-field").val("");
            });
        }

    }]);
})(app);