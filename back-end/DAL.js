const { mongoose, Schema } = require("mongoose");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
require("dotenv").config();
const bcrypt = require("bcryptjs");
const cardEncrypt = require("./cardEncryption");

const config = {
	connectionString: process.env.CONNECTION_STRING,
	userCollection: "Users",
	productCollection: "Products",
	serviceCollection: "Services",
	bookingCollection: "Bookings",
	eventsCollection: "Events",
};

mongoose.connect(config.connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const user = new Schema(
	{
		Email: { type: String, required: true, unique: true },
		Name: String,
		Password: { type: String, required: true },
		Roles: Array,
		Images: [],
		Disabled: Boolean,
		Products: [{ ProductID: String, Qty: Number }],
		CheckoutInfo: Object,
	},
	{ collection: config.userCollection }
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
		Alt: String,
	},
	{ collection: config.productCollection }
);
const productsModel = mongoose.model("products", products);

const services = new Schema(
	{
		name: String,
		txt: Number,
		alt: String,
		img: String,
		price: [String],
	},
	{ collection: config.serviceCollection }
);
const servicesModel = mongoose.model("services", services);

const bookings = new Schema(
	{
		Name: String,
		Email: String,
		PhoneNumber: String,
		Message: String,
		Location: String,
		Session: String,
		HearAbout: String,
		Approved: Boolean,
		Contacted: Boolean,
		DateBooked: String,
		DateScheduled: String,
		EventID: String,
	},
	{ collection: config.bookingCollection }
);
const bookingsModel = mongoose.model("bookings", bookings);

const events = new Schema(
	{
		title: String,
		start: String,
		backgroundColor: String,
		borderColor: String,
	},
	{ collection: config.eventsCollection }
);
const eventsModel = mongoose.model("events", events);

exports.dal = {
	createUser: async (email, name, password) => {
		let check = {
			Email: email,
		};
		let user = {
			Email: email,
			Name: name,
			Password: await bcrypt.hash(password, 10),
			Roles: ["User", "Client"],
			Images: [],
			Disabled: false,
			Products: [],
			CheckoutInfo: {},
		};
		let existingUser = await userModel.collection.find(check).toArray();
		if (existingUser.length > 0) {
			return "";
		} else {
			let newUser = await userModel.collection.insertOne(user);
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

	editRoles: async (id, roles) => {
		let values = { Roles: roles };
		await userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $set: values }
		);
	},

	editImgs: async (id, images) => {
		let values = { Images: images };
		await userModel.collection.updateOne(
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
			throw error;
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
		await userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $push: { Images: { $each: pictures } } }
		);
		return id + " updated";
	},
	showProducts: async () => {
		return await productsModel.find({}).exec();
	},
	addToCart: async (id, product, qty) => {
		const existingCartItem = await userModel
			.findOne({ _id: new mongodb.ObjectId(id), "Products.ProductID": product })
			.exec();

		if (existingCartItem) {
			await userModel.updateOne(
				{ _id: new mongodb.ObjectId(id), "Products.ProductID": product },
				{ $inc: { "Products.$.Qty": qty } }
			);
		} else {
			const newItem = {
				ProductID: product,
				Qty: qty,
			};

			await userModel.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{ $push: { Products: newItem } }
			);
		}
	},
	editQty: async (userId, productId, qty) => {
		await userModel.updateOne(
			{ _id: new mongodb.ObjectId(userId), "Products.ProductID": productId },
			{ $set: { "Products.$.Qty": qty } }
		);
	},
	disableUser: async (id) => {
		let user = await userModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});

		if (user !== null) {
			await userModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{ $set: { Disabled: !user.Disabled } }
			);
		}
	},
	deleteImage: async (id, imageUrl) => {
		await userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $pull: { Images: { name: imageUrl } } }
		);
	},
	showCart: async (id) => {
		return await userModel.find({ _id: new mongodb.ObjectId(id) }).exec();
	},
	findProducts: async (id) => {
		let temp = await productsModel
			.findOne({ _id: new mongodb.ObjectId(id) })
			.exec();
		return temp;
	},
	clearCart: async (id) => {
		return await userModel.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{ $set: { Products: [] } }
		);
	},
	deleteCartItem: async (cartID, productID) => {
		await userModel.collection.updateOne(
			{ _id: new mongodb.ObjectId(cartID) },
			{ $pull: { Products: { ProductID: productID } } }
		);
	},
	getServices: async () => {
		return await servicesModel.find({}).exec();
	},
	bookingInfo: async (data) => {
		let newData = {
			Name: data.name,
			Email: data.email,
			PhoneNumber: data.phnumber,
			Message: data.msg,
			Location: data.location,
			Session: data.session,
			HearAbout: data.hearAbout,
			Approved: false,
			Contacted: false,
			DateBooked: data.date,
			DateScheduled: "",
			EventID: "",
		};
		await bookingsModel.collection.insertOne(newData);
	},
	getBookings: async () => {
		return await bookingsModel.find({}).exec();
	},
	changeApproved: async (id) => {
		let booking = await bookingsModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});

		if (booking !== null) {
			await bookingsModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{ $set: { Approved: !booking.Approved } }
			);
		}
	},
	changeContacted: async (id) => {
		let booking = await bookingsModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});

		if (booking !== null) {
			await bookingsModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{ $set: { Contacted: !booking.Contacted } }
			);
		}
	},
	changeDateScheduled: async (id, date) => {
		let booking = await bookingsModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});

		if (booking !== null && booking.EventID !== "") {
			await bookingsModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{ $set: { DateScheduled: date } }
			);
			await eventsModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(booking.EventID) },
				{ $set: { start: date } }
			);
		} else if (booking !== null) {
			let event = {
				title: "Photo shoot",
				clientName: booking.Name,
				session: booking.Session,
				start: date,
				backgroundColor: "#40797A",
				borderColor: "#40797A",
			};
			let newEvent = await eventsModel.collection.insertOne(event);
			let newId = newEvent.insertedId.toString();
			await bookingsModel.collection.updateOne(
				{ _id: new mongodb.ObjectId(id) },
				{
					$set: {
						EventID: newId,
						DateScheduled: date,
					},
				}
			);
		}
	},
	findBooking: async (id) => {
		return await bookingsModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});
	},
	createEvent: async (date, id) => {
		let bookingInfo = await bookingsModel.collection.findOne({
			_id: new mongodb.ObjectId(id),
		});
		let event = {
			title: "Photo shoot",
			start: date,
			backgroundColor: "#40797A",
			borderColor: "#40797A",
			bookingID: id,
			name: bookingInfo.Name,
			session: bookingInfo.Session
		};
		let newEvent = await eventsModel.collection.insertOne(event);
		return newEvent;
	},
	createHoliday: async (date, title) => {
		let years = {
			startyear: "2000",
			endyear: "3000",
		};
		var regex = /\d{4}/;
		let event = {
			title: title,
			start: date,
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			display: "background",
			rrule: {
				freq: "yearly",
				dtstart: date.replace(regex, years.startyear),
				until: date.replace(regex, years.endyear),
			},
		};
		let newEvent = await eventsModel.collection.insertOne(event);
		return newEvent;
	},
	getEvents: async () => {
		return await eventsModel.find({}).exec();
	},
	getSomeEvents: async () => {
		return await eventsModel.find({ title: "Photo shoot" }).exec();
	},
	saveInfo: async (email, info) => {
		const user = await userModel.collection.findOne({ Email: email });

		if (user && user.CheckoutInfo && user.CheckoutInfo.ccNumber) {
			// Card is already encrypted, no need to re-encrypt
			console.log("Card is already encrypted");
			return;
		}

		const encryptedCardNumber = cardEncrypt.encryptCardNumber(info.ccNumber);

		// Exclude CVV from info
		const { ccv, date, ...infoWithoutCVVAndDate } = info;
		const last4Digits = info.ccNumber.slice(-4);

		// Save infoWithoutCVVAndDate to the database
		await userModel.collection.updateOne(
			{ Email: email },
			{
				$set: {
					CheckoutInfo: {
						...infoWithoutCVVAndDate,
						ccNumber: encryptedCardNumber,
						last4Digits: last4Digits,
					},
				},
			}
		);
	},
};
