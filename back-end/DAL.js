const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectID;
const path = require("path");
require("dotenv").config();
var bcrypt = require("bcryptjs");


const connectionString = process.env.CONNECTION_STRING;
const userCollection = "Users";
const pictureCollection = "Pictures";
const productCollection = "Products";
const cartCollection = "Checkout";

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const pic = new Schema(
	{
		name: String,
		data_url: String,
	},
	{ collection: pictureCollection }
);
const picModel = mongoose.model("pic", pic);

const user = new Schema(
	{
		Email: { type: String, required: true, unique: true },
		Name: String,
		Password: { type: String, required: true },
		Roles: Array,
		Images: [],
	},
	{ collection: userCollection }
);

const userModel = mongoose.model("user", user);

const products = new Schema(
	{
		Name: String,
		Price: Number,
		Description: String,
		BriefDescription: String,
		DisplayImage: String,
		SelectedImage: String,
	},
	{ collection: productCollection }
);
const productsModel = mongoose.model("products", products);

const cart = new Schema(
	{
		UserID: String,
		Products: [{ ProductID: String, Qty: Number }],
	},
	{ collection: cartCollection }
);

const cartModel = mongoose.model("cart", cart);

exports.dal = {
	createUser: async (email, name, password) => {
		let check = {
			Email: email,
		};
		let user = {
			Email: email,
			Name: name,
			Password: await bcrypt.hash(password, 10),
			Roles: ["User"],
			Images: [],
		};
		let existingUser = await userModel.collection.find(check).toArray();
		console.log("Existing User ", existingUser);
		if (existingUser.length > 0) {
			console.log("user found");
			return "";
		} else {
			console.log(name + " added");
			let newUser = await userModel.collection.insertOne(user);
			let id = newUser.insertedId.toString();
			let data = {
				UserID: id,
				Products: [],
			};
			await cartModel.collection.insertOne(data);
			return newUser;
		}
	},
	checkUser: async (email, password) => {
		try {
			const cursor = await userModel.collection.find({
				Email: email,
				Password: password,
			});
			const result = await cursor.toArray();
			return result;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	listUsers: async () => {
		return await userModel.find({}).exec();
	},

	listClients: async () => {
		clients = {
			Roles: "Client",
		};
		return await userModel.find(clients).exec();
	},

	editRoles: async (id, roles) => {
		let values = { Roles: roles };
		userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $set: values }
		);
	},

	editImgs: async (id, images) => {
		let values = { Images: images };
		userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $set: values }
		);
	},
	findUser: async (id) => {
		return await userModel.find({ _id: new mongodb.ObjectId(id) }).exec();
	},
	findUserEmail: async (email) => {
		try {
			email = email.replace(/^"(.*)"$/, "$1");
			return await userModel.findOne({ Email: email }).exec();
		} catch (error) {
			console.error("Error finding user:", error);
			throw error; // Rethrow the error to be handled by the caller of this function.
		}
	},
	addProducts: async (name, price, des, briefdes, disimg, selectedimg) => {
		let data = {
			Name: name,
			Price: price,
			Description: des,
			BriefDescription: briefdes,
			DisplayImage: disimg,
		};

		return await productsModel.collection.insertOne(data);
	},
	addImgs: async (id, pictures) => {
		userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $push: { Images: { $each: pictures } } }
		);
		return id + " updated";
	},
	showProducts: async () => {
		return await productsModel.find({}).exec();
	},
	addToCart: async (id, product) => {
		const existingCartItem = await cartModel
			.findOne({ UserID: id, "Products.ProductID": product })
			.exec();

		if (existingCartItem) {
			await cartModel.updateOne(
				{ UserID: id, "Products.ProductID": product },
				{ $inc: { "Products.$.Qty": 1 } }
			);
		} else {
			const newItem = {
				ProductID: product,
				Qty: 1,
			};

			await cartModel.updateOne(
				{ UserID: id },
				{ $push: { Products: newItem } }
			);
		}
	},
	deleteUser: async (id) => {
		if (
			userModel.collection.findOne({ _id: new mongodb.ObjectId(id) }) !== null
		) {
			await userModel.collection.deleteOne({ _id: new mongodb.ObjectId(id) });
			await cartModel.collection.deleteOne({ UserID: id });
		}
	},
	showCart: async (id) => {
		return await cartModel.find({ UserID: id }).exec();
	},
	findProducts: async (id) => {
		let temp = await productsModel
			.findOne({ _id: new mongodb.ObjectId(id) })
			.exec();
		// console.log(temp)
		return temp;
	},
	clearCart: (id) => {
		return cartModel.updateOne({ UserID: id }, { $set: { Products: [] } });
	},
};
