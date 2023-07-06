const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
const path = require('path')
require('dotenv').config()
//process.env.CONNECTION_STRING

const connectionString = process.env.CONNECTION_STRING
const testingCollection = "Testing"
const idTestCollection = "GrabIDTest"
const userCollection = "Users"

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
	useNewUrlParser: true,
})

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const idTest = new Schema ({
    Name: String,
    Price: Number,
}, {collection: idTestCollection})

const idTestModel = mongoose.model("idTest", idTest)

const test = new Schema ({
    Name: String,
    Age: Number,
    TestId: [String]
}, {collection: testingCollection})

const testModel = mongoose.model("test", test)

const user = new Schema ({
    Email: String,
    Name: String,
    Password: String,
    IsClient: Boolean,
}, {collection: userCollection})

const userModel = mongoose.model("user", user)

exports.dal = {
    createTestId: (name, price) => {
        let data = {
            Name: name,
            Price: price
        }
        console.log(data)
        idTestModel.collection.insertOne(data)
        console.log(name+ " added")
    },
    grabTestId: (name, age, id) =>{
        let data = {
            Name: name,
            Age:age,
            TestId: id
        }
        console.log(data)
        testModel.collection.insertOne(data)
        console.log(name+ " added")
    },
    createUser: (email, name, password) => {
        let user = {
            Email: email,
            Name: name,
            Password: password
        }
        userModel.collection.insertOne(user)
        console.log(name+ " added")
    },
    populateTestData: () =>{
        let url = "https://randomuser.me/api/?results=5"
        let people = []
        fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data.results);
				people = data.results;
			})
			.catch((err) => console.log(err));

        // console.log(people)
        people.forEach(person => {
            userModel.collection.insertOne(person.email, person.name.first, person.login.password)
        });
    }
}