"use strict";

(function(app) {
    app.service("ImageService", ["$resource", "$location", function($resource, $location) {
        let appUrl = $location.protocol() + "://" + $location.host();

        this.images = function() {
            return $resource(appUrl + "/api/images?url=:url&uid=:uid", {url: "@url", uid: "@uid"});
        }

    }]);
})(app);