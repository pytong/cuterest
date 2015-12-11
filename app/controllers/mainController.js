"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$uibModal", "$compile", "UserService", "ImageService", ($scope, $uibModal, $compile, UserService, ImageService) => {

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
                let uid = $scope.generateRandomUid();
                ImageService.images()
                    .save({url: url, uid: uid}, (res) => {
                        $(".url-field").val("");

                        if(res.success === false) {
                            $scope.errorMessage = res.result;
                        } else {
                            let item = $scope.createItem(url, uid);
                            container.prepend(item).masonry("prepended", item, true);
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
                            item = $scope.createItem(image.url, image.uid);
                            container.prepend(item);
                        });

                        $scope.initMasonry();
                    }
                });
        }

        $scope.deleteImage = (uid) => {
            $scope.errorMessage = "";

            ImageService.images()
                .delete({uid: uid}, (res) => {
                    if(res.success === true) {
                        let item = $("#" + uid);
                        container.masonry("remove", item);
                        container.masonry();
                    } else {
                        $scope.errorMessage = res.result;
                    }
                });
        }

        $scope.createItem = (url, uid) => {
            let item = $('<div class="item" id="' + uid + '"><img src=' + '"' + url + '"' + '/></div>');
            item.append('<span class="delete-image" ng-click="deleteImage(\'' + uid + '\')">x</span>');
            $compile(item)($scope);

            return item;
        }

        $scope.initMasonry = () => {
            container.imagesLoaded(function(){
                container.masonry(masonry_options);
            });
        }

        $scope.generateRandomUid = () => {
            let uid = "",
                possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for(let i=0; i < 6; i++) {
                uid += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            }

            return uid;
        }

        $scope.loadImages();

    }]);
})(app);