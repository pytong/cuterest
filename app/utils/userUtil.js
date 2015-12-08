"use strict";

let User = require('../models/users'),
    TwitterUser = require('../models/twitterUsers');

module.exports = {
    userExists: function(params, callback) {
        User.findOne(params, function(err, user) {
            if(err) { return callback({success: false}); }

            if(typeof(user) === "undefined" || user === null) {
                return callback({success: true, exists: false});
            }

            return callback({success: true, exists: true});
        });
    },

    updateSettings: function(params, callback) {
        let message = "Failed to update settings.",
            _this = this;

        User.findOne({username: params.username}, function(err, user) {
            if(err) { return callback({success: false, message: message}); }

            if(typeof(user) !== "undefined" && user !== null) {
                _this.saveUser(user, params, function(success) {
                    if(success === false) {  return callback({success: false, message: message}); }
                    return callback({success: true});
                });

            } else {
                TwitterUser.findOne({"twitter.username": params.username}, function(err, user) {
                    if(err) { return callback({success: false, message: message}); }

                    if(typeof(user) !== "undefined" && user !== null) {
                        _this.saveUser(user, params, function(success) {
                            if(success === false) {  return callback({success: false, message: message}); }
                            return callback({success: true});
                        });
                    } else {
                        return callback({success: false, message: message});
                    }
                });
            }
        });
    },

    saveUser: function(user, params, callback) {
        if(params.name) {
            user.name = params.name;
        }

        if(params.city) {
            user.city = params.city;
        }

        if(params.state) {
            user.state = params.state;
        }

        user.save(function(err) {
            if(err) { return callback(false); }
            return callback(true);
        });
    }

}