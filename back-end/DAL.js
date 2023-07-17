const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectID;
const path = require("path");
require("dotenv").config();
//process.env.CONNECTION_STRING

const connectionString = process.env.CONNECTION_STRING;
const testingCollection = "Testing";
const idTestCollection = "GrabIDTest";
const userCollection = "Users";

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const idTest = new Schema(
	{
		Name: String,
		Price: Number,
	},
	{ collection: idTestCollection }
);

const idTestModel = mongoose.model("idTest", idTest);

const test = new Schema(
	{
		Name: String,
		Age: Number,
		TestId: [String],
	},
	{ collection: testingCollection }
);

const testModel = mongoose.model("test", test);

const user = new Schema(
	{
		Email: String,
		Name: String,
		Password: String,
		IsClient: Boolean,
	},
	{ collection: userCollection }
);

const userModel = mongoose.model("user", user);

exports.dal = {
	createUser: async (email, name, password) => {
		let check = {
			Email: email,
		};
		let user = {
			Email: email,
			Name: name,
			Password: password,
		};
		let existingUser = await userModel.collection.find(check).toArray();
		console.log("Existing User ", existingUser)
		if (existingUser.length > 0) {
            console.log("user found")
			return "";
		} else {
			console.log(name + " added");
			return await userModel.collection.insertOne(user);
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
};
