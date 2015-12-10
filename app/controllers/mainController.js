"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$uibModal", "UserService", "ImageService", ($scope, $uibModal, UserService, ImageService) => {

        UserService.loginStatus().get(function(res) {
            $scope.isLoggedIn = res.status;
        });

        let container = $("#container"),
            masonry_options = {columnWidth: ".item", itemSelector: ".item", isAnimated: true};

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
                            let item = $('<div class="item"><img src=' + '"' + url + '"' + '/></div>');

                            if($scope.images.length < 1) { $scope.initMasonry(); }
                            container.append(item).masonry("appended", item, true);
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
                        let item;
                        $scope.images = res.result;

                        $scope.images.forEach(function(image) {
                            item = $('<div class="item"><img src=' + '"' + image.url + '"' + '/></div>');
                            container.append(item);
                        });

                        if($scope.images.length > 0) { $scope.initMasonry(); }
                    }
                });
        }

        $scope.deleteImage = (imageId) => {
            $scope.errorMessage = "";

            ImageService.images()
                .delete({id: imageId}, (res) => {
                    if(res.success === true) {
                        $scope.loadImages();
                    } else {
                        $scope.errorMessage = "Failed to delete image. Please try again later."
                    }
                });
        }

        $scope.initMasonry = () => {
            container.imagesLoaded(function(){
                container.masonry(masonry_options);
            });
        }

        $scope.loadImages();

    }]);
})(app);