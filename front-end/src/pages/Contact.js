import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Contact = () => {
	return (
		<div>
			<h1>Contact Us</h1>
			<div className="flex">
				<div className="calenderDiv">
					<FullCalendar className="calender"
						plugins={[dayGridPlugin]}
						initialView="dayGridMonth"
						weekends={true}
						events={[
							{ title: "event 1", date: "2023-07-04" },
							{ title: "event 2", date: "2023-07-07" },
						]
					}
					/>
				</div>

				<div className="form">
					<div>
						<h3>Email Us</h3>
						<form>
							<label htmlFor="name">Name:</label>
							<br />
							<input
								id="name"
								name="name"
								placeholder="Name"
								type="text"
								required
							/>
							<br />

							<label htmlFor="email">Email:</label>
							<br />
							<input
								id="email"
								name="email"
								placeholder="Email"
								type="email"
								required
							/>

							<label htmlFor="message">Message:</label>
							<br />
							<textarea
								id="message"
								name="message"
								placeholder="Email body"
								rows="2"
								cols="25"
							></textarea>
							<br />

							<button type="submit">Send Email</button>
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
