const express = require("express");
const router = express.Router();
const dal = require("../DAL").dal;
const fsPromises = require("fs").promises;
const path = require("path");

// Move user-related routes here
module.exports = (app) => {
	app.get("/findUser/:id", async (req, res) => {
		let id = req.params.id;
		let user = await dal.findUser(id);
		res.json({ User: user });
	});

	const path = require("path");

	app.post("/editImgs/:id", async (req, res) => {
		try {
			const userId = req.params.id;
			const images = req.body.images;

			const updatedImageArray = [];
			const userImagePath = path.join(
				__dirname,
				"..",
				"public",
				"images",
				userId
			); // Adjusting the path to go one level up

			// Check if the directory exists, if not, create it
			try {
				await fsPromises.access(userImagePath);
			} catch (error) {
				if (error.code === "ENOENT") {
					await fsPromises.mkdir(userImagePath, { recursive: true });
				} else {
					throw error;
				}
			}

			// Determine the next available image index
			let startIndex = 0;
			try {
				const existingImages = await fsPromises.readdir(userImagePath);
				if (existingImages.length > 0) {
					const lastImageName = existingImages[existingImages.length - 1];
					const lastIndex = parseInt(lastImageName.match(/\d+/)[0]);
					startIndex = lastIndex + 1;
				}
			} catch (error) {
				// Handle error if the directory is empty or does not exist yet
				console.error("Error reading existing images:", error);
			}

			for (let index = 0; index < images.length; index++) {
				const img = images[index];
				const imageName = `Image_${startIndex + index}.jpg`; // Continuing the number sequence

				const imagePath = path.join(userImagePath, imageName);

				// Convert data URL to buffer
				const imageData = Buffer.from(img.url.split(",")[1], "base64");

				// Save the image data to file
				await fsPromises.writeFile(imagePath, imageData);

				updatedImageArray.push({
					name: imageName,
					url: `http://localhost:5000/images/${userId}/${imageName}`,
				});
			}

			dal.addImgs(userId, updatedImageArray);

			res.status(200).json({
				message: "Images uploaded and saved successfully.",
				images: updatedImageArray,
			});
		} catch (error) {
			console.error("Error uploading images:", error);
			res.status(500).json({ error: "Internal server error." });
		}
	});

	app.post("/editRoles/:id", async (req, res) => {
		let id = req.params.id;
		let roles = req.body;
		const trueKeys = Object.keys(roles).filter((key) => roles[key]);

		dal.editRoles(id, trueKeys);
		res.json({ Message: "updated" });
	});

	app.get("/deleteImages/:id/:imageUrl", async (req, res) => {
		let id = req.params.id;
		let imageUrl = req.params.imageUrl;
		const userImagePath = path.join(
			__dirname,
			"..",
			"public",
			"images",
			id,
			"/"
		);
		dal.deleteImage(id, imageUrl);
		let user = await dal.findUser(id);

		fsPromises.unlink(userImagePath + imageUrl, (err) => {
			if (err) {
				throw err;
			}

			console.log("Delete File successfully.");
		});
		res.json({ Message: "Image Deleted", User: user });
	});

	app.get("/listUsers", async (req, res) => {
		users = await dal.listUsers();
		res.json(users);
	});

	app.get("/deleteUser/:id", async (req, res) => {
		let id = req.params.id;
		await dal.disableUser(id);
		let users = await dal.listUsers();
		res.json({ Message: "User Disabled", Users: users });
	});

	app.get("/deleteCart/:userId/:id", async (req, res) => {
		userId = req.params.userId;
		id = req.params.id;
		await dal.deleteCartItem(userId, id);
		let product = await dal.findProducts(id);
		const user = await dal.showCart(userId);

		res.json({
			Message: product.Name + " was deleted from your cart",
			User: user[0],
		});
	});
};
