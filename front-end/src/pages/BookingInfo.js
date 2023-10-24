import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const BookingInfo = () => {
	let { id } = useParams();
	const [booking, setBooking] = useState({});
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0) {
				setLoggedIn(true);
				setRoles(localStorage.getItem("Roles"));
			}
		};

		window.addEventListener("storage", handleStorage());
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	useEffect(() => {
		let getUrl = `http://localhost:5001/findBooking/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setBooking(data.Booking);
				setLoading(false); // Set loading to false when the data is received
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
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
							{booking ? (
								<>
									<div className="bookingInfo">
										<div>
											<h3><b>Name:</b> {booking.Name}</h3>
											<h3><b>Email:</b> {booking.Email}</h3>
											<h3><b>Phone Number:</b> {booking.PhoneNumber}</h3>
											<h3><b>
												Message:</b>{" "}
												{booking.Message
													? booking.Message
													: "No Message Attached"}
											</h3>
											<h3><b>Location:</b> {booking.Location}</h3>
											<h3><b>Session Type:</b> {booking.Session}</h3>
											<h3><b>Approved:</b> {booking.Approved ? "Yes" : "No"}</h3>
											<h3><b>Contacted:</b> {booking.Contacted ? "Yes" : "No"}</h3>
											<h3><b>Date Request was sent:</b> {booking.DateBooked}</h3>
											<h3><b>
												Scheduled Date:</b>{" "}
												{booking.DateScheduled ? booking.DateScheduled : "No"}
											</h3>
                                            <button>Update Info</button>
										</div>
									</div>
								</>
							) : (
								<></>
							)}
						</>
					)}
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
				</>
			)}
		</div>
	);
};

export default BookingInfo;
