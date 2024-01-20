const express = require("express");
const bcrypt = require("bcryptjs");
const dal = require("../DAL").dal;

module.exports = (app) => {
	app.post("/login", async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		try {
			const found = await dal.findUserEmail(email);

			if (!found) {
				// No user found with the given email
				res.json({ Message: "Invalid Email or password" });
				return; // Return to avoid further execution
			}

			if (found.Disabled) {
				// Account is disabled
				res.json({
					Message: "Your account was disabled.",
				});
				return; // Return to avoid further execution
			}

			// Check the password
			const checkPasswords = await bcrypt.compare(password, found.Password);

			if (checkPasswords) {
				res.json({ Message: `${found.Email} found`, User: found });
			} else {
				// Password is incorrect
				res.json({ Message: "Invalid Email or password" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ Message: "An error occurred" });
		}
	});

	app.post("/signup", async (req, res) => {
		let email = req.body.email;
		let name = req.body.name;
		let password = req.body.password;

		let user = await dal.createUser(email, name, password);
		if (user == "") {
			return res.json({ Message: "Email already in use", User: null });
		} else {
			sendUser = await dal.findUser(user.insertedId);
			return res.json({ Message: `${email} was added!`, User: sendUser });
		}
	});
};