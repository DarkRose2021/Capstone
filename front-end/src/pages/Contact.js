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

	return (
		<div>
			<h1>Contact Us</h1>
			<div className="flex">
				<div className="calenderDiv">
					<FullCalendar
						className="calender"
						plugins={[dayGridPlugin]}
						initialView="dayGridMonth"
						weekends={true}
						events={[
							{ title: "event 1", date: "2023-07-04" },
							{ title: "event 2", date: "2023-07-07" },
						]}
					/>
				</div>

				<div className="form">
					<div>
						<h3>Email Us</h3>
						<form onSubmit={handleFormData}>
							<input type="hidden" name="contact_number" />
							<label htmlFor="from_name">Name:</label>
							<input
								value={values.from_email}
								onChange={handleInputChange}
								id="from_name"
								name="from_name"
								placeholder="Name"
								type="text"
							/>

							<label htmlFor="from_email">Email:</label>
							<input
								id="from_email"
								name="from_email"
								placeholder="Email"
								type="email"
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
								rows="2"
								cols="25"
							></textarea>

							<input type="submit" className="btn" value={"Send Email"} />
						</form>
						<h4>
							Call Me at <a href="tel:3853550184">(385)355-0184</a>
						</h4>
					</div>
				</div>
			</div>
			<br />
			<br />
			<br />
		</div>
	);
};

export default Contact;
