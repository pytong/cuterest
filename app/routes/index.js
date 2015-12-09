"use strict";

let path = process.cwd(),
	imageUtil = require("../utils/imageUtil"),
	userUtil = require("../utils/userUtil");


module.exports = (app, passport) => {

	app.use((req, res, next) => {
		if(req.isAuthenticated()) {
			req.username = req.user.username ? req.user.username : req.user.twitter.username;
		}

		next();
	});

	app.route("/api/images")
		.get((req, res) => {
			imageUtil.getImages((success, result) => {
				res.json({success: success, result: result});
			});
		})
		.post((req, res) => {
			if(!req.isAuthenticated()) {
				return res.json({success: false, result: "You are not authenticated."});
			}

			let url = req.query.url;
			imageUtil.addImage(url, (success, result) => {
				res.json({success: success, result: result});
			});
		});

	app.route("/api/users/profile")
		.get((req, res) => {
			if(req.isAuthenticated()) {
				res.json({success: true, profile: req.user});
			} else {
				res.json({success: false});
			}
		})
		.post((req, res) => {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			let params = req.query;
			params.username = req.username;

			userUtil.updateSettings(params, (result) => {
				res.json(result);
			});
		});

	app.get("/api/users/email_exists", (req, res) => {
		let username = req.query.username;
		userUtil.userExists({username: username}, (result) => {
			let success = result.success,
				exists = result.exists;

			if(success === true && exists === false) {
				res.json({exists: false});
			} else {
				res.json({exists: true});
			}
		});
	})

	app.get("/api/users/login_status", (req, res) => {
		let status = req.isAuthenticated();
		res.json({status: status});
	});

	app.get("/api/users/signin", passport.authenticate("local-signin"),
		(req, res) => {
			res.json({success: true});
		});

	app.post("/api/users/signup-submit", passport.authenticate("local-signup"),
		(req, res) => {
			res.json({success: true});
		});

	app.post("/api/users/logout", (req, res) => {
		req.logout();
		res.json({success: true});
	});

	app.get("/auth/twitter", passport.authenticate("twitter"));

	app.get("/auth/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/#/signin" }),
		(req, res) => {
			res.redirect("/#/account");
		});

	app.get("*", (req, res) => {
		res.sendFile(path + "/public/index.html");
	});

};
