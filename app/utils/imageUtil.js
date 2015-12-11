"use strict";

let Image = require("../models/images");

module.exports = {

    addImage: (params, callback) => {
        let errorMessage = "Failed to add image. Please try again later.",
            image;

        Image.findOne({url: params.url, username: params.username}, (err, result) => {
            if(err) { return callback(false, errorMessage); }

            if(typeof(result) === "undefined" || result === null) {
                image = new Image();
                image.url = params.url;
                image.uid = params.uid;
                image.username = params.username;

                image.save((err) => {
                   if(err) { return callback(false, errorMessage); }

                   callback(true);
                });
            } else {
                callback(false, "Image already exists.")
            }
        });
    },

    deleteImage: (params, callback) => {
        Image.remove(params, function(err, res) {
            if(err) { return callback(false); }
            callback(true);
        });
    },

    getImages: (params, callback) => {
        Image.find(params, (err, images) => {
            if(err) { return callback(false, "Failed to get images."); }

            callback(true, images);
        });
    }

}