// const express = require("express");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");
// const fsPromises = require("fs").promises;
// const path = require("path");
// var bcrypt = require("bcryptjs");
// const { start } = require("repl");
// const fs = require("fs");

// const dal = require("./DAL").dal;
// const port = 5000;
// const app = express();

// app.use(express.json({ limit: "150mb" }));
// app.use(
// 	express.urlencoded({
// 		limit: "150mb",
// 		extended: true,
// 	})
// );
// app.use(cors());
// app.use(express.static("public"));
// // app.use('/public/images', express.static('/public/'));

// app.get("/", (req, res) => {
// 	res.json("Welcome to the backend of my website");
// });

// app.get("/services", async (req, res) => {
// 	let service = await dal.getServices();
// 	res.json(service);
// });

// app.post("/bookingInfo", async (req, res) => {
// 	await dal.bookingInfo(req.body);
// 	res.json("submitted");
// });

// function getRandomObjectFromArray(array) {
// 	const randomIndex = Math.floor(Math.random() * array.length);
// 	return array[randomIndex];
// }

// app.get("/testing/:id", async (req, res) => {
// 	let id = req.params.id;
// 	imgs = [];
// 	let allImages = await dal.showAllImgs();
// 	for (let i = 0; i < 9; i++) {
// 		foundImg = getRandomObjectFromArray(allImages);
// 		imgs.push(foundImg);
// 	}

// 	let user = dal.addImgs(id, imgs);

// 	res.json(user);
// });

// app.get("/findUserEmail/:email", async (req, res) => {
// 	let email = req.params.email;
// 	let user = await dal.findUserEmail(email);
// 	res.json({ User: user });
// });

// app.get("/fetchImages/:id", async (req, res) => {
// 	let id = req.params.id;
// 	let user = await dal.findUser(id);
// 	res.json({ User: user });
// });

// app.get("/bookings", async (req, res) => {
// 	let bookings = await dal.getBookings();
// 	res.json({ Bookings: bookings });
// });

// app.get("/approve/:id", async (req, res) => {
// 	let id = req.params.id;
// 	await dal.changeApproved(id);
// 	let booking = await dal.findBooking(id);
// 	res.json({ Booking: booking });
// });

// app.get("/contacted/:id", async (req, res) => {
// 	let id = req.params.id;
// 	await dal.changeContacted(id);
// 	let booking = await dal.findBooking(id);
// 	res.json({ Booking: booking });
// });

// app.post("/updateDate/:id", async (req, res) => {
// 	let id = req.params.id;
// 	let date = req.body.dateScheduled;
// 	let booking = await dal.findBooking(id);
// 	if (booking) await dal.changeDateScheduled(id, date);
	
// 	await dal.createEvent(date)
// 	booking = await dal.findBooking(id);
// 	res.json({ Booking: booking });
// });

// app.get("/findBooking/:id", async (req, res) => {
// 	const id = req.params.id;
// 	const booking = await dal.findBooking(id);

// 	if (booking) {
// 		res.json({ Booking: booking });
// 	} else {
// 		res.status(404).json({ Message: "Booking not found" });
// 	}
// });

// app.post("/createEvent/:date", async (req, res) => {
// 	let date = req.params.date;
// 	await dal.createEvent(date);
// 	let events = await dal.getEvents();
// 	res.json({ Events: events });
// });

// app.post("/createHoliday/:date/:title", async (req, res) => {
// 	let date = req.params.date;
// 	let title = req.params.title;
// 	await dal.createHoliday(date, title);
// 	let events = await dal.getEvents();
// 	res.json({ Events: events });
// });

// app.get("/getEvents", async (req, res) =>{
// 	let events = await dal.getEvents()
// 	res.json({ Events:  events});
// })

// app.get("/getSomeEvents", async (req, res) =>{
// 	let events = await dal.getSomeEvents()
// 	res.json({ Events:  events});
// })
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const port = 5000;

app.use(express.json({ limit: '150mb' }));
app.use(
  express.urlencoded({
    limit: '150mb',
    extended: true,
  })
);
app.use(cors());
app.use(express.static('public'));
dotenv.config();

// Include route files
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/cartRoutes')(app);
require('./routes/adminRoutes')(app);

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
