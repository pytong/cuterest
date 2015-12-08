(function(app) {
    app.controller("NavigationBarController", ["$scope", "$location", "UserService", function($scope, $location, UserService) {

        $scope.showSignInLink = false;
        $scope.showRegisterLink = false;
        $scope.showLogoutLink = false;
        $scope.showSettingsLink = false;

        UserService.loginStatus().get(function(res) {
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

        $scope.logout = function() {
            UserService.logout().save(function(res) {
                if(res.success === true) {
                    window.location.href = "#/signin";
                }
            });
        }

    }]);
})(app);