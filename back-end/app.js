const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require('uuid')

const dal = require("./DAL").dal;
const port = 5000
const app = express()

const testUserAPI = "https://randomuser.me/api/?results=50"

app.get("/", (req, res) => {
    res.json("Welcome to the backend of my website")
})

app.post("/test", async (req, res) => {
    let name = req.query.name
    let age = req.query.age
    let id = req.query.id
    await dal.grabTestId(name, age, id)
    res.json(name + age)
})

app.listen(port, () =>{
    console.log("Listening on port " +port)
})