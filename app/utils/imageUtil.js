"use strict";

let Image = require("../models/images");

module.exports = {

    addImage: (url, callback) => {
        let errorMessage = "Failed to add image. Please try again later.",
            image;

        Image.findOne({url: url}, (err, result) => {
            if(err) { return callback(false, errorMessage); }

            if(typeof(result) === "undefined" || result === null) {
                image = new Image();
                image.url = url;

                image.save((err) => {
                   if(err) { return callback(false, errorMessage); }

                   callback(true);
                });
            } else {
                callback(false, "Image already exists.")
            }
        });
    },

    getImages: (params, callback) => {
        Image.find(params, (err, images) => {
            if(err) { return callback(false, "Failed to get images."); }

            callback(true, images);
        });
    }

}