"use strict";

(function(app) {
    app.service("ImageService", ["$resource", "$location", function($resource, $location) {
        var appUrl = $location.protocol() + "://" + $location.host();

        this.images = function() {
            return $resource(appUrl + "/api/images?username=:username&url=:url&uid=:uid", {username: "@username", url: "@url", uid: "@uid"});
        }

    }]);
})(app);