"use strict";

((app) => {
    app.controller("MainController", ["$scope", "$routeParams", "$uibModal", "$compile", "UserService", "ImageService", ($scope, $routeParams, $uibModal, $compile, UserService, ImageService) => {

        $scope.targetUsername = $routeParams.username;

        let container = $("#container");

        UserService.profile().get(function(res) {
            if(res.success === true) {
                $scope.user = res.profile;
                $scope.isLoggedIn = true;
                $scope.currentUsername = $scope.user.username || $scope.user.twitter.username;
            } else {
                $scope.isLoggedIn = false;
            }
        });

        $scope.initMasonry = () => {
            let masonry_options = {columnWidth: ".item", itemSelector: ".item", isAnimated: true};
            container.imagesLoaded(function(){
                container.masonry(masonry_options);
            });
        }


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
                            let item = $scope.createItem(url, uid, $scope.currentUsername);
                            container.prepend(item).masonry("prepended", item, true);
                        }
                    });
            }, (data) => {
                // dismissed
                $(".url-field").val("");
            });
        }

        $scope.loadImages = () => {
            let params = {};

            if($scope.targetUsername) {
                params.username = $scope.targetUsername;
            }

            ImageService.images()
                .get(params, (res) => {
                    if(res.status === false) {
                        $scope.errorMessage = res.result;
                    } else {
                        let item;
                        $scope.images = res.result

                        $scope.images.forEach(function(image) {
                            item = $scope.createItem(image.url, image.uid, image.username);
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

        $scope.createItem = (url, uid, username) => {
            let item = $('<div class="item" id="' + uid + '"><img src=' + '"' + url + '"' + '/><div><div class="username text-center"><a href="#/?username='  + username+ '">' + username + '</a></div></div></div>');
            item.append('<span class="delete-image" ng-show="currentUsername == \'' + username + '\'" ng-click="deleteImage(\'' + uid + '\')">x</span>');
            $compile(item)($scope);

            return item;
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