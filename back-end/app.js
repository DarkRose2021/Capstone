const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const dal = require("./DAL").dal;
const port = 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json("Welcome to the backend of my website");
});

app.get("/clientPics", async (req, res) => {});

app.get("/clients", async (req, res) => {});

app.get("/login", async (req, res) => {});

app.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	try {
		let found = await dal.checkUser(email, password);
		console.log(found[0]);
		let found_email = found[0].Email;
		res.json({ Message: `${found_email} found`, User: found[0] });
	} catch {
		res.json({ Message: "Invalid Email or password" });
	}
});

app.get("/signup", async (req, res) => {
	return res.json({ Message: "Getting the Signup Page" });
});

app.post("/signup", async (req, res) => {
	//TODO: check that the email doesn't already exist
	let email = req.body.email;
	let name = req.body.name;
	let password = req.body.password;
	console.log(req.body);
	let user = await dal.createUser(email, name, password);
	if (user == "") {
		return res.json({ Message: "Email already in use", User: null });
	} else {
		return res.json({ Message: `${email} was added!`, User: user });
	}
});

app.get("/cart", async (req, res) => {});

app.get("/products", async (req, res) => {});

app.get("/listUsers", async (req, res) => {
	users = await dal.listUsers();
	res.json(users);
});

app.get("/listClients", async (req, res) => {
	clients = await dal.listClients();
	res.json(clients);
});

app.get("/editRoles/", async (req, res) => {
});

app.post("/editRoles/:id", async (req, res) => {
	let id = req.params.id
	let roles = req.body
	const trueKeys = Object.keys(roles).filter(key => roles[key]);

	dal.editRoles(id, trueKeys)
	res.json({Message: "updated", id: id, roles: roles})
});

app.get("/findUser/:id", async (req, res) => {
	let id = req.params.id
	let user = await dal.findUser(id)
	res.json({User: user})
});

app.listen(port, () => {
	console.log("Listening on port " + port);
});
