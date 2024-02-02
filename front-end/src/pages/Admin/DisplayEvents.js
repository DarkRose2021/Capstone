import React from "react";

const DisplayEvents = ({ event }) => {
	return (
		<div key={event._id} className="user">
			<h3>
				<b>Event Name:</b> {event.title}
			</h3>
			<h3>
				<b>Client Name:</b> {event.name}
			</h3>
			<h3>
				<b>Session Type:</b> {event.session}
			</h3>
			<h3>
				<b>Date:</b> {event.start}
			</h3>
		</div>
	);
};

export default DisplayEvents;
