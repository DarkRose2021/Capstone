const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require('uuid')

const dal = require("./DAL").dal;
const port = 5000
const app = express()

// var bodyParser = require('body-parser')
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const testUserAPI = "https://randomuser.me/api/?results=50"

app.get("/", (req, res) => {
    res.json("Welcome to the backend of my website")
})

app.post("/test", async (req, res) => {
    let name = req.query.name
    let age = req.query.age
    let id = req.query.id
    console.log(name)
    await dal.grabTestId(name, age, id)
    res.json(name + age)
})

app.get("/clientPics", async (req, res) => {

})

app.get("/clients", async (req, res) => {
    
})

app.get("/login", async (req, res) => {
    
})

app.get("/signup", async (req, res) => {
    return res.json({Message: "Getting the Signup Page"})
})

app.post("/signup", (req, res) => {
    let email = req.body.email
    let name = req.body.name
    let password = req.body.password

    dal.createUser(email, name, password)
    return res.json({Message: `${name} was added!`})
})

app.get("/cart", async (req, res) => {
    
})

app.get("/products", async (req, res) => {
    
})

app.listen(port, () =>{
    console.log("Listening on port " +port)
})