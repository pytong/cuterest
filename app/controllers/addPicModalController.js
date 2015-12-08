"use strict";

((app) => {
    app.controller("AddPicModalController", ["$scope", ($scope) => {
        $scope.errorMessage = "";

        $scope.setupBrokeImageDetection = () => {
            $(".pic-preview").error(function() {
                $(this).attr("src", "/public/img/missing-image.png");
            });
        }

        $scope.showPicPreview = (url) => {
            $scope.setupBrokeImageDetection();
            $scope.previewUrl = url;
        }
    }]);
})(app);