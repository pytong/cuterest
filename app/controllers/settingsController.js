"use strict";

(function(app) {
    app.controller("SettingsController", ["$scope", "UserService", function($scope, UserService) {

        UserService.profile().get(function(res) {
            if(res.success === true) {
                $scope.profile = res.profile;
            } else {
                window.location.href = "#/signin";
            }
        });

        $scope.updateProfile = function() {
            let name = $scope.user.name,
                city = $scope.user.city,
                state = $scope.user.state;

            UserService.profile(name, city, state)
                .save(
                    function(res) { //success
                        if(res.success === true) {
                            window.location.href = "#/";
                        } else {
                            $scope.error = res.message;
                        }
                    },
                    function(err) { //err
                        $scope.error = "Failed to update profile.";
                    }
                );
        }
    }]);
})(app);
