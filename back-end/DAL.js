const { mongoose, Schema } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;
require("dotenv").config()
//process.env.CONNECTION_STRING

const connectionString = process.env.CONNECTION_STRING
const testingCollection = "Testing"
const idTestCollection = "GrabIDTest"

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
    }
}