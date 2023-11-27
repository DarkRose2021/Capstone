const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");
var bcrypt = require("bcryptjs");
const { start } = require("repl");
const fs = require("fs");

const dal = require("./DAL").dal;
const port = 5000;
const app = express();

app.use(express.json({ limit: "150mb" }));
app.use(
	express.urlencoded({
		limit: "150mb",
		extended: true,
	})
);
app.use(cors());
app.use(express.static("public"));
// app.use('/public/images', express.static('/public/'));

app.get("/", (req, res) => {
	res.json("Welcome to the backend of my website");
});

app.get("/login", async (req, res) => {});

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

app.get("/signup", async (req, res) => {
	return res.json({ Message: "Getting the Signup Page" });
});

app.get("/services", async (req, res) => {
	let service = await dal.getServices();
	res.json(service);
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

app.post("/bookingInfo", async (req, res) => {
	await dal.bookingInfo(req.body);
	res.json("submitted");
});

app.get("/cart/:id", async (req, res) => {
	let id = req.params.id;
	const user = await dal.showCart(id);
	return res.json(user);
});

app.get("/clearCart/:id", async (req, res) => {
	let id = req.params.id;
	let cart = await dal.clearCart(id);
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

app.post("/addToCart/:items", async (req, res) => {
	const items = req.params.items;
	const data = JSON.parse(items);
	dal.addToCart(data.items.UserID, data.items.Products, data.items.ProductQty);
});

app.get("/changeQty/:userId/:productId/:qty", async (req, res) => {
	let userId = req.params.userId;
	let productId = req.params.productId;
	let qty = req.params.qty;
	await dal.editQty(userId, productId, qty);
	const user = await dal.showCart(userId);
	return res.json(user);
});

app.get("/products", async (req, res) => {
	products = await dal.showProducts();
	res.json(products);
});

app.get("/deleteUser/:id", async (req, res) => {
	let id = req.params.id;
	await dal.disableUser(id);
	let users = await dal.listUsers();
	res.json({ Message: "User Disabled", Users: users });
});

app.get("/deleteImages/:id/:imageUrl", async (req, res) => {
	let id = req.params.id;
	let imageUrl = req.params.imageUrl;
	const userImagePath = path.join(__dirname, "public", "images", id, "/");
	dal.deleteImage(id, imageUrl);
	let user = await dal.findUser(id);

	fs.unlink(userImagePath + imageUrl, (err) => {
		if (err) {
			throw err;
		}

		console.log("Delete File successfully.");
	});
	res.json({ Message: "Image Deleted", User: user });
});

app.post("/checkout/:email", async (req, res) => {
	let email = req.params.email
	let body = req.body;
	if(body.saveInfo){
		await dal.saveInfo(email, body)
	}
	res.json({ Message: "data submitted to the back", Body: body });
});

app.get("/listUsers", async (req, res) => {
	users = await dal.listUsers();
	res.json(users);
});

app.post("/editRoles/:id", async (req, res) => {
	let id = req.params.id;
	let roles = req.body;
	const trueKeys = Object.keys(roles).filter((key) => roles[key]);

	dal.editRoles(id, trueKeys);
	res.json({ Message: "updated" });
});

app.post("/editImgs/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const images = req.body.images;

		const updatedImageArray = [];
		const userImagePath = path.join(__dirname, "public", "images", userId);

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

function getRandomObjectFromArray(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

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

app.get("/findUser/:id", async (req, res) => {
	let id = req.params.id;
	let user = await dal.findUser(id);
	res.json({ User: user });
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
	tax = Number((tax / 100)).toPrecision(2);
	return res.json(tax);
});

app.get("/bookings", async (req, res) => {
	let bookings = await dal.getBookings();
	res.json({ Bookings: bookings });
});

app.get("/approve/:id", async (req, res) => {
	let id = req.params.id;
	await dal.changeApproved(id);
	let booking = await dal.findBooking(id);
	res.json({ Booking: booking });
});

app.get("/contacted/:id", async (req, res) => {
	let id = req.params.id;
	await dal.changeContacted(id);
	let booking = await dal.findBooking(id);
	res.json({ Booking: booking });
});

app.post("/updateDate/:id", async (req, res) => {
	let id = req.params.id;
	let date = req.body.dateScheduled;
	await dal.changeDateScheduled(id, date);
	// await dal.createEvent(date)
	let booking = await dal.findBooking(id);
	res.json({ Booking: booking });
});

app.get("/findBooking/:id", async (req, res) => {
	const id = req.params.id;
	const booking = await dal.findBooking(id);

	if (booking) {
		res.json({ Booking: booking });
	} else {
		res.status(404).json({ Message: "Booking not found" });
	}
});

app.post("/createEvent/:date", async (req, res) => {
	let date = req.params.date;
	await dal.createEvent(date);
	let events = await dal.getEvents();
	res.json({ Events: events });
});

app.post("/createHoliday/:date/:title", async (req, res) => {
	let date = req.params.date;
	let title = req.params.title;
	await dal.createHoliday(date, title);
	let events = await dal.getEvents();
	res.json({ Events: events });
});

app.get("/getEvents", async (req, res) =>{
	let events = await dal.getEvents()
	res.json({ Events:  events});
})

app.get("/getSomeEvents", async (req, res) =>{
	let events = await dal.getSomeEvents()
	res.json({ Events:  events});
})

app.listen(port, () => {
	console.log("Listening on port " + port);
});
