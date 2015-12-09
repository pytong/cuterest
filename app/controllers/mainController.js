"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$uibModal", "UserService", "ImageService", ($scope, $uibModal, UserService, ImageService) => {

        UserService.loginStatus().get(function(res) {
            $scope.isLoggedIn = res.status;
        });

        $(".grid").masonry({
          columnWidth: 200,
          itemSelector: ".grid-item",
          gutter: 10,
          isResizeBound: true
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
                            $scope.loadImages();
                        }
                    });
            }, (data) => {
                // dismissed
                $(".url-field").val("");
            });
        }

        $scope.loadImages = () => {
            ImageService.images()
                .get({}, (res) => {
                    if(res.status === false) {
                        $scope.errorMessage = res.result;
                    } else {
                        $scope.images = res.result;
                    }
                });
        }

        $scope.loadImages();

    }]);
})(app);