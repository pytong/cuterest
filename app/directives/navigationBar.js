((app) => {
    app.directive("navigationBar", () => {
        return {
            restrict: "E",
            scope: {
                loggedIn: "="
            },
            controller: "NavigationBarController",
            templateUrl: "views/navigationBar.html"
        };
    });
})(app);