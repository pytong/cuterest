"use strict";

((app) => {
    app.controller("SettingsController", ["$scope", "UserService", ($scope, UserService) => {

        UserService.profile().get((res) => {
            if(res.success === true) {
                $scope.profile = res.profile;
            } else {
                window.location.href = "#/signin";
            }
        });

        $scope.updateProfile = () => {
            var name = $scope.user.name,
                city = $scope.user.city,
                state = $scope.user.state;

            UserService.profile(name, city, state)
                .save(
                    (res) => { //success
                        if(res.success === true) {
                            window.location.href = "#/";
                        } else {
                            $scope.error = res.message;
                        }
                    },
                    (err) => { //err
                        $scope.error = "Failed to update profile.";
                    }
                );
        }
    }]);
})(app);
