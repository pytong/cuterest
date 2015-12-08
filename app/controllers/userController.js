"use strict";

((app) => {
    app.controller("UserController", ["$scope", "UserService", ($scope, UserService) => {

        $scope.signin = () => {
            let username = $scope.user.email,
                password = $scope.user.password;
            UserService.signin(username, password)
                .get(
                    (res) => { //success
                        window.location.href = "#/";
                    },
                    (err) => { //error
                        $scope.error = "Incorrect email or password";
                    }
                );
        }

        $scope.signup = () => {
            let name = $scope.user.name,
                username = $scope.user.email,
                password = $scope.user.password;

            UserService.emailExists(username)
                .get(
                    (res) => { // success
                        if(res.exists === true) {
                            $scope.error = "Email already exists";
                        } else {
                            UserService.signup(name, username, password)
                                .save(
                                    (res) => { //success
                                        if(res.success === true) {
                                            window.location.href = "#/";
                                        } else {
                                            $scope.error = res.message;
                                        }
                                    },
                                    (err) => { //error
                                        $scope.error = "Failed to register.";
                                    }
                                );
                        }
                    },
                    (err) => { //error
                        $scope.error = "Failed to register.";
                    }
                );

        }

    }]);
})(app);