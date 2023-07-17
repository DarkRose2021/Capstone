const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectID;
const path = require("path");
require("dotenv").config();
//process.env.CONNECTION_STRING

const connectionString = process.env.CONNECTION_STRING;
const userCollection = "Users";
const clientCollection = "Client";

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const user = new Schema(
	{
		Email: String,
		Name: String,
		Password: String,
		Roles: Array,
	},
	{ collection: userCollection }
);

const userModel = mongoose.model("user", user);

const client = new Schema(
	{
		Email: String,
		Name: String,
		Password: String,
		Roles: Array,
	},
	{ collection: userCollection }
);

const clientModel = mongoose.model("client", client);

exports.dal = {
	createUser: async (email, name, password) => {
		let check = {
			Email: email,
		};
		let user = {
			Email: email,
			Name: name,
			Password: password,
			Roles: []
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
	listUsers: async () =>{
        return await userModel.find({}).exec()
    },

	listClients: async () =>{
        return await clientModel.find({}).exec()
    }
};
