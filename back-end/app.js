const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require('uuid')

const port = 5000
const app = express()

app.get("/", (req, res) => {
    res.json("Welcome to the backend of my website")
})

app.listen(port, () =>{
    console.log("Listening on port " +port)
})