const express = require("express");
const router = express.Router();
const dal = require("../DAL").dal;

// Move user-related routes here

module.exports = (app) => {
	app.post("/bookingInfo", async (req, res) => {
		await dal.bookingInfo(req.body);
		res.json("submitted");
	});
	app.get("/bookings", async (req, res) => {
		let bookings = await dal.getBookings();
		res.json({ Bookings: bookings });
	});

	app.get("/approve/:id", async (req, res) => {
		let id = req.params.id;
		await dal.changeApproved(id);
		let booking = await dal.findBooking(id);
		res.json({ Booking: booking });
	});

	app.get("/contacted/:id", async (req, res) => {
		let id = req.params.id;
		await dal.changeContacted(id);
		let booking = await dal.findBooking(id);
		res.json({ Booking: booking });
	});
	app.post("/updateDate/:id", async (req, res) => {
		let id = req.params.id;
		let date = req.body.dateScheduled;
		let booking = await dal.findBooking(id);
		if (booking) await dal.changeDateScheduled(id, date);

		await dal.createEvent(date, id);
		booking = await dal.findBooking(id);
		res.json({ Booking: booking });
	});

	app.get("/findBooking/:id", async (req, res) => {
		const id = req.params.id;
		const booking = await dal.findBooking(id);

		if (booking) {
			res.json({ Booking: booking });
		} else {
			res.status(404).json({ Message: "Booking not found" });
		}
	});

	app.post("/createEvent/:date/:id", async (req, res) => {
		let date = req.params.date;
		let id = req.params.id;
		await dal.createEvent(date, id);
		let events = await dal.getEvents();
		res.json({ Events: events });
	});

	app.post("/createHoliday/:date/:title", async (req, res) => {
		let date = req.params.date;
		let title = req.params.title;
		await dal.createHoliday(date, title);
		let events = await dal.getEvents();
		res.json({ Events: events });
	});

	app.get("/getEvents", async (req, res) => {
		let events = await dal.getEvents();
		res.json({ Events: events });
	});

	app.get("/getSomeEvents", async (req, res) => {
		let events = await dal.getSomeEvents();
		res.json({ Events: events });
	});
};
