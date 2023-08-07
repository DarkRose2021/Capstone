const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const formidable = require("formidable");
// var form = new formidable.IncomingForm();

// // ADD THIS LINE to increase file size limit to 10 GB; default is 200 MB
// form.maxFileSize = 10 * 1024 * 1024 * 1024;

const dal = require("./DAL").dal;
const port = 5000;
const app = express();

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
app.use(bodyParser.json({ limit: "150mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "150mb",
		extended: true,
	})
);
app.use(cors());

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

app.get("/cart", async (req, res) => {

});

app.post("/addToCart/:id/:email", async (req, res) => {
	const id = 
});


app.get("/products", async (req, res) => {
	products = await dal.showProducts();
	res.json(products);
});

app.get("/checkout", async (req, res) => {});

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

app.get("/editImgs/:id", async (req, res) => {
	// let id = req.params.id
	// let images = dal.findUser(id)
	// res.json({Message: "Images Found", Images: images.Images})
});

app.post("/editImgs/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		// console.log(userId)
		const images = req.body.images;

		const updatedImageArray = images.map((img, index) => {
			return {
				url: img.url,
				name: `Image_${index + 1}`, // Add the "name" field based on the index (adding 1 to index for 1-based numbering)
			};
		});

		dal.addImgs(userId, updatedImageArray);

		res.status(200).json({ message: "Images uploaded successfully." });
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
// fetchImages/

app.get("/fetchImages/:id", async (req, res) => {
	let id = req.params.id;
	let user = await dal.findUser(id);
	res.json({ User: user });
});


app.listen(port, () => {
	console.log("Listening on port " + port);
});
