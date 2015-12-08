"use strict";

(function(app) {
    app.controller("AddPicModalController", ["$scope", function($scope) {
        $scope.errorMessage = "";

        $scope.setupBrokeImageDetection = function() {
            $(".pic-preview").error(function(){
                $(this).attr("src", '/public/img/missing-image.png');
            });
        }

        $scope.showPicPreview = function(url) {
            $scope.setupBrokeImageDetection();
            $scope.previewUrl = url;
        }
    }]);
})(app);