const express = require("express");
const router = express.Router();
const dal = require("../DAL").dal;
function getRandomObjectFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


module.exports = (app) => {
	app.get("/services", async (req, res) => {
		let service = await dal.getServices();
		res.json(service);
	});

	
	app.get("/testing/:id", async (req, res) => {
		let id = req.params.id;
		imgs = [];
		let allImages = await dal.showAllImgs();
		for (let i = 0; i < 9; i++) {
			foundImg = getRandomObjectFromArray(allImages);
			imgs.push(foundImg);
		}

		let user = dal.addImgs(id, imgs);

		res.json(user);
	});

	app.get("/findUserEmail/:email", async (req, res) => {
		let email = req.params.email;
		let user = await dal.findUserEmail(email);
		res.json({ User: user });
	});

	app.get("/fetchImages/:id", async (req, res) => {
		let id = req.params.id;
		let user = await dal.findUser(id);
		res.json({ User: user });
	});
};
