import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const Contact = () => {
	const [values, setValues] = useState({
		from_name: "",
		from_email: "",
		html_message: "",
	});
	const [isSending, setIsSending] = useState(false);
	const [events, setEvents] = useState();
	const [loading, setLoading] = useState(true);

	const handleFormData = (event) => {
		setIsSending(true);
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
					setIsSending(false);
				},
				(error) => {
					console.log("FAILED...", error);
				}
			);
	};

	useEffect(() => {
		let url = `https://mane-frame-backend.onrender.com/getEvents`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setEvents(data.Events);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setValues((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="contact">
			<h1>Contact Us</h1>
			<div className="flex">
				{loading ? ( // Display loading animation while loading is true
					<div className="loading-container">
						<div className="loadingio-spinner-spinner-la1rcf32xa">
							<div className="ldio-t5ijoz38lif">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="calenderDiv">
							<FullCalendar
								plugins={[rrulePlugin, dayGridPlugin, interactionPlugin]}
								initialView="dayGridMonth"
								weekends={true}
								events={events}
								handleWindowResize={true}
								// eventClick={}
							/>
						</div>
					</>
				)}

				<div className="form">
					<div>
						<h3>Contact Us</h3>
						<form onSubmit={handleFormData}>
							<input type="hidden" name="contact_number" />
							<label htmlFor="from_name">
								Name<span className="required">*</span>
							</label>
							<input
								value={values.from_name}
								onChange={handleInputChange}
								id="from_name"
								name="from_name"
								placeholder="Name"
								required
								type="text"
							/>

							<label htmlFor="from_email">
								Email<span className="required">*</span>
							</label>
							<input
								id="from_email"
								name="from_email"
								placeholder="Email"
								type="email"
								required
								value={values.from_email}
								onChange={handleInputChange}
							/>

							<label htmlFor="html_message">
								Message<span className="required">*</span>
							</label>
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

							<button type="submit" className="btn" disabled={isSending}>
								{isSending ? "Sending..." : "Send Email"}
							</button>
						</form>
						<h4>
							Call us at <a href="tel:3853550184">(385)355-0184</a>
						</h4>
						<h4 className="email">
							Email us at{" "}
							<a href="mailto:maneframephotography2023@gmail.com">
								maneframephotography2023
								<br />
								@gmail.com
							</a>
						</h4>
					</div>
				</div>
			</div>
			<br />
		</div>
	);
};

export default Contact;
