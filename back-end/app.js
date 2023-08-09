const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const formidable = require("formidable");
const fs = require('fs').promises;
const path = require("path");
const http = require('http');

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

app.use('/images', express.static("public"));

app.get("/", (req, res) => {
	res.json("Welcome to the backend of my website");
});

app.get("/login", async (req, res) => {});

app.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	try {
		let found = await dal.checkUser(email, password);
		// console.log(found[0])
		let found_email = found[0].Email;
		res.json({ Message: `${found_email} found`, User: found[0] });
	} catch {
		res.json({ Message: "Invalid Email or password", User: null });
	}
});

app.get("/signup", async (req, res) => {
	return res.json({ Message: "Getting the Signup Page" });
});

app.get("/deleteCart/:userId/:id", async (req, res) => {
	userId = req.params.userId;
	id = req.params.id;
	console.log(userId);
	console.log(id);
});

app.post("/signup", async (req, res) => {
	let email = req.body.email;
	let name = req.body.name;
	let password = req.body.password;
	console.log(req.body);
	let user = await dal.createUser(email, name, password);
	if (user == "") {
		return res.json({ Message: "Email already in use", User: null });
	} else {
		sendUser = await dal.findUser(user.insertedId);
		return res.json({ Message: `${email} was added!`, User: sendUser });
	}
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
	dal.addToCart(data.items.UserID, data.items.Products);
});

app.get("/products", async (req, res) => {
	products = await dal.showProducts();
	res.json(products);
});

app.get("/deleteUser/:id", async (req, res) => {
	let id = req.params.id;
	dal.deleteUser(id);
	let users = await dal.listUsers();
	res.json({ Message: "User Deleted", Users: users });
});

app.post("/checkout", async (req, res) => {
	let body = req.body;
	console.log(body);
	res.json({ Message: "data submitted to the back", Body: body });
});

app.get("/listUsers", async (req, res) => {
	users = await dal.listUsers();
	res.json(users);
});

app.get("/listClients", async (req, res) => {
	clients = await dal.listClients();
	res.json(clients);
});

app.get("/editRoles/", async (req, res) => {});

app.post("/editRoles/:id", async (req, res) => {
	let id = req.params.id;
	let roles = req.body;
	const trueKeys = Object.keys(roles).filter((key) => roles[key]);

	dal.editRoles(id, trueKeys);
	res.json({ Message: "updated" });
});

app.post('/editImgs/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const images = req.body.images;

        const updatedImageArray = [];

        for (let index = 0; index < images.length; index++) {
            const img = images[index];
            const imageName = `Image_${index + 1}.jpg`; // Assuming you want to save as JPEG format

            const imagePath = path.join(__dirname, 'public', 'images', userId, imageName);

            // Convert data URL to buffer
            const imageData = Buffer.from(img.url.split(',')[1], 'base64');

            // Save the image data to file
            await fs.writeFile(imagePath, imageData);
            console.log('Image saved:', imagePath);

            updatedImageArray.push({ name: imageName, url: `http://localhost:5000/public/images/${userId}/${imageName}` });
        }

		dal.addImgs(userId, updatedImageArray)

        res.status(200).json({ message: 'Images uploaded and saved successfully.', images: updatedImageArray });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
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
// fetchImages/

app.get("/fetchImages/:id", async (req, res) => {
	let id = req.params.id;
	let user = await dal.findUser(id);
	res.json({ User: user });
});

app.listen(port, () => {
	console.log("Listening on port " + port);
});
