import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const Contact = () => {
	const [values, setValues] = useState({
		from_name: "",
		from_email: "",
		html_message: "",
	});

	const handleFormData = (event) => {
		event.preventDefault();
		emailjs
			.send("service_iua6vej", "template_hnmq0z9", values, "jhFwa0eEmp0_7VOPv")
			.then(
				(response) => {
					console.log("SUCCESS!", response);
					setValues({
						from_name: "",
						from_email: "",
						html_message: "",
					});
				},
				(error) => {
					console.log("FAILED...", error);
				}
			);
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setValues((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	let events = [
		{
			title: "Photo shoot",
			start: "2023-10-08",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-09-23",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-09-03",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-09-16",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-08-12",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-08-17",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-08-27",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-08-01",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-08-08",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-09-19",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Photo shoot",
			start: "2023-09-08",
			backgroundColor: "#40797A",
			borderColor: "#40797A",
		},
		{
			title: "Christmas",
			date: "2023-12-25",
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			allDay: true,
		},
		{
			title: "Christmas Eve",
			date: "2023-12-24",
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			allDay: true,
		},
		{
			title: "New Years Eve",
			date: "2023-12-31",
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			allDay: true,
		},
		{
			title: "Halloween",
			date: "2023-10-31",
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			allDay: true,
		},
		{
			title: "New Years Day",
			date: "2023-01-01",
			backgroundColor: "#9E7B9B",
			borderColor: "#9E7B9B",
			allDay: true,
		},
	];

	return (
		<div className="contact">
			<h1>Contact Us</h1>
			<div className="flex">
				<div className="calenderDiv">
					<FullCalendar
						className="calender"
						plugins={[dayGridPlugin]}
						initialView="dayGridMonth"
						weekends={true}
						events={events}
						handleWindowResize={true}
					/>
				</div>

				<div className="form">
					<div>
						<h3>Contact Us</h3>
						<form onSubmit={handleFormData}>
							<input type="hidden" name="contact_number" />
							<label htmlFor="from_name">Name:</label>
							<input
								value={values.from_name}
								onChange={handleInputChange}
								id="from_name"
								name="from_name"
								placeholder="Name"
								required
								type="text"
							/>

							<label htmlFor="from_email">Email:</label>
							<input
								id="from_email"
								name="from_email"
								placeholder="Email"
								type="email"
								required
								value={values.from_email}
								onChange={handleInputChange}
							/>

							<label htmlFor="html_message">Message:</label>
							<textarea
								value={values.html_message}
								onChange={handleInputChange}
								id="html_message"
								name="html_message"
								placeholder="Email body"
								required
								rows="2"
								cols="25"
							></textarea>

							<input type="submit" className="btn" value={"Send Email"} />
						</form>
						<h4>
							Call us at <a href="tel:3853550184">(385)355-0184</a>
						</h4>
						<h4 className="email">
							Email us at <a href="mailto:maneframephotography2023@gmail.com">maneframephotography2023<br />@gmail.com</a>
						</h4>
					</div>
				</div>
			</div>
			<br />
		</div>
	);
};

export default Contact;
