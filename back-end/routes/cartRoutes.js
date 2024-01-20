const express = require("express");
const router = express.Router();
const dal = require("../DAL").dal;

module.exports = (app) => {
	app.post("/checkout/:email", async (req, res) => {
		let email = req.params.email;
		let body = req.body;
		if (body.saveInfo) {
			await dal.saveInfo(email, body);
		}
		res.json({ Message: "data submitted to the back", Body: body });
	});

	app.get("/products", async (req, res) => {
		products = await dal.showProducts();
		res.json(products);
	});

	app.get("/changeQty/:userId/:productId/:qty", async (req, res) => {
		let userId = req.params.userId;
		let productId = req.params.productId;
		let qty = req.params.qty;
		await dal.editQty(userId, productId, qty);
		const user = await dal.showCart(userId);
		return res.json(user);
	});

	app.post("/addToCart/:items", async (req, res) => {
		const items = req.params.items;
		const data = JSON.parse(items);
		dal.addToCart(
			data.items.UserID,
			data.items.Products,
			data.items.ProductQty
		);
	});

	app.get("/findProduct/:id", async (req, res) => {
		let id = req.params.id;
		let idArray = id.split(",");

		let products = [];

		for (const id of idArray) {
			const product = await dal.findProducts(id);
			products.push(product);
		}
		return res.json(products);
	});

	app.get("/clearCart/:id", async (req, res) => {
		let id = req.params.id;
		let cart = await dal.clearCart(id);
	});

	app.get("/cart/:id", async (req, res) => {
		let id = req.params.id;
		const user = await dal.showCart(id);
		return res.json(user);
	});

	app.get("/tax/:state", (req, res) => {
		let state = req.params.state;
		let tax = 0;
		state = state.toLowerCase();

		switch (state) {
			case "alabama":
				tax = 4;
				break;
			case "alaska":
				tax = 0;
				break;
			case "arizona":
				tax = 5.6;
				break;
			case "arkansas":
				tax = 6.5;
				break;
			case "california":
				tax = 7.25;
				break;
			case "colorado":
				tax = 2.9;
				break;
			case "connecticut":
				tax = 6.35;
				break;
			case "delaware":
				tax = 0;
				break;
			case "florida":
				tax = 6;
				break;
			case "georgia":
				tax = 4;
				break;
			case "hawaii":
				tax = 4;
				break;
			case "idaho":
				tax = 6;
				break;
			case "illinois":
				tax = 6.25;
				break;
			case "indiana":
				tax = 7;
				break;
			case "iowa":
				tax = 6;
				break;
			case "kansas":
				tax = 6.5;
				break;
			case "kentucky":
				tax = 6;
				break;
			case "louisiana":
				tax = 4.45;
				break;
			case "maine":
				tax = 5.5;
				break;
			case "maryland":
				tax = 6;
				break;
			case "massachusetts":
				tax = 6.25;
				break;
			case "michigan":
				tax = 6;
				break;
			case "minnesota":
				tax = 6.88;
				break;
			case "mississippi":
				tax = 7;
				break;
			case "missouri":
				tax = 4.22;
				break;
			case "montana":
				tax = 0;
				break;
			case "nebraska":
				tax = 5.5;
				break;
			case "nevada":
				tax = 6.85;
				break;
			case "new hampshire":
				tax = 0;
				break;
			case "new jersey":
				tax = 6.63;
				break;
			case "new mexico":
				tax = 5.13;
				break;
			case "new york":
				tax = 4;
				break;
			case "north carolina":
				tax = 4.75;
				break;
			case "north dakota":
				tax = 5;
				break;
			case "ohio":
				tax = 5.75;
				break;
			case "oklahoma":
				tax = 4.5;
				break;
			case "oregon":
				tax = 0;
				break;
			case "pennsylvania":
				tax = 6;
				break;
			case "rhode island":
				tax = 7;
				break;
			case "south carolina":
				tax = 6;
				break;
			case "south dakota":
				tax = 4.5;
				break;
			case "tennessee":
				tax = 7;
				break;
			case "texas":
				tax = 6.25;
				break;
			case "utah":
				tax = 6.1;
				break;
			case "vermont":
				tax = 6;
				break;
			case "virginia":
				tax = 5.3;
				break;
			case "washington":
				tax = 6.5;
				break;
			case "west virginia":
				tax = 6;
				break;
			case "wisconsin":
				tax = 5;
				break;
			case "wyoming":
				tax = 4;
				break;
			default:
				return "Invalid state name";
		}
		tax = Number(tax / 100).toFixed(2);
		return res.json(tax);
	});
};
