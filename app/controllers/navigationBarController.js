((app) => {
    app.controller("NavigationBarController", ["$scope", "$location", "UserService", ($scope, $location, UserService) => {

        $scope.showSignInLink = false;
        $scope.showRegisterLink = false;
        $scope.showLogoutLink = false;
        $scope.showSettingsLink = false;

        UserService.loginStatus().get((res) => {
            if(res.status === true) {
                $scope.showLogoutLink = true;
                $scope.showSignInLink = false;
                $scope.showRegisterLink = false;
                $scope.showSettingsLink = true;

                if($location.path() === "/signin" || $location.path() === "/signup") {
                    window.location.href = "#/";
                }
            } else {
                $scope.showLogoutLink = false;
                $scope.showSignInLink = true;
                $scope.showRegisterLink = true;
                $scope.showSettingsLink = false;
            }
        });

        $scope.logout = () => {
            UserService.logout().save((res) => {
                if(res.success === true) {
                    window.location.href = "#/signin";
                }
            });
        }

    }]);
})(app);