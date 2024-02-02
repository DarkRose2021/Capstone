import React from "react";
import { Link } from "react-router-dom";

const DisplayBookings = ({ booking }) => {
	return (
		<div key={booking._id} className="user">
			<h3>
				<b>Sender's Name:</b> {booking.Name}
			</h3>
			<h3>
				<b>Sender's Email:</b> {booking.Email}
			</h3>
			<h3>
				<b>Approved:</b> {booking.Approved ? "Yes" : "No"}
			</h3>
			<h3>
				<b>Contacted:</b> {booking.Contacted ? "Yes" : "No"}
			</h3>
			<h3>
				<b>Date Requested:</b> {booking.DateBooked}
			</h3>
			<h3>
				<b>Date Scheduled:</b>{" "}
				{booking.DateScheduled ? booking.DateScheduled : "Not Scheduled"}
			</h3>
			<Link to={`/BookingInfo/${booking._id}`}>
				<button>View More Info</button>
			</Link>
		</div>
	);
};

export default DisplayBookings;
