const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");
var bcrypt = require('bcryptjs');
const { start } = require("repl");

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
		let found = await dal.findUserEmail(email)
		let found_email = found.Email;

		if(found){
			let checkPasswords = await bcrypt.compare(password, found.Password)

			if(checkPasswords){
				res.json({ Message: `${found_email} found`, User: found });
			}
		}
		
	} catch {
		res.json({ Message: "Invalid Email or password" });
	}
});

app.get("/signup", async (req, res) => {
	return res.json({ Message: "Getting the Signup Page" });
});

app.get("/deleteCart/:userId/:id", async (req, res) => {
	userId = req.params.userId;
	id = req.params.id;
	dal.deleteItem(userId, id)
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

app.get("/deleteImages/:id/:imageUrl", async (req, res) => {
	let id = req.params.id;
	let imageUrl = req.params.imageUrl;
	const userImagePath = path.join(__dirname, "public", "images", id);
	dal.deleteUser(id, imageUrl);
	let users = await dal.listUsers();

	fs.unlink(userImagePath + imageUrl, (err) => {
		if (err) {
			throw err;
		}
	
		console.log("Delete File successfully.");
	});
	res.json({ Message: "User Deleted", Users: users });
});

app.post("/checkout", async (req, res) => {
	let body = req.body;
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

app.listen(port, () => {
	console.log("Listening on port " + port);
});
