"use strict";

let app = angular.module("CuterestApp", ["ngResource", "ngRoute", "ui.bootstrap"]);

app.config(($locationProvider, $routeProvider) => {

    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .when("/signin", {
        controller: "UserController",
        templateUrl: "/views/signin.html"
    })
    .when("/signup", {
        controller: "UserController",
        templateUrl: "/views/signup.html"
    })
    .when("/settings", {
        controller: "SettingsController",
        templateUrl: "/views/settings.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});