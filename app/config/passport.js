"use strict";

let TwitterStrategy = require("passport-twitter").Strategy,
	LocalStrategy = require("passport-local").Strategy,
    TwitterUser = require("../models/twitterUsers"),
    bcrypt = require("bcryptjs"),
    User = require("../models/users"),
    configAuth = require("./auth");

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		TwitterUser.findById(id, (err, user) => {
			if (err) { return done(err); }

			if(user) {
				done(err, user);
			} else {
				User.findById(id, (err, user) => {
					if(err) { return done(err); }
					done(err, user);
				});
			}
		});
	});

	passport.use("twitter", new TwitterStrategy({
			consumerKey: configAuth.twitterAuth.consumerKey,
			consumerSecret: configAuth.twitterAuth.consumerSecret,
			callbackURL: configAuth.twitterAuth.callbackURL
		},
		(token, tokenSecret, profile, done) => {
			TwitterUser.findOne({ "twitter.id": profile.id }, (err, user) => {
				if (err) { return done(err); }

				if (user) {
					return done(null, user);
				} else {
					let newUser = new TwitterUser();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.name = profile.displayName;

					newUser.save((err) => {
						if (err) { return done(err); }

						return done(null, newUser);
					});
				}
			});
		}
	));

	passport.use("local-signup", new LocalStrategy(
		{
			passReqToCallback: true
		},
		(req, username, password, done) => {
			let newUser = new User();

			newUser.username = username;
			newUser.password = bcrypt.hashSync(password, 8);

			newUser.save((err) => {
				if (err) { return done(err); }

				return done(null, newUser);
			});
		}
	));

    passport.use("local-signin", new LocalStrategy(
	    (username, password, done) => {
	        User.findOne({ username: username }, (err, user) => {
		        if (err) { return done(err); }

		        if (!user) {
		            return done(null, false, { message: "Unknown user " + username });
		        }

		        if (bcrypt.compareSync(password, user.password) === false) {
		            return done(null, false, { message: "Invalid password" });
		        }
		        return done(null, user);
		    });
	    }
	));
};
