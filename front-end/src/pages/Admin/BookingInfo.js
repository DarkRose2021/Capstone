import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Loading from "../OnAllPages/Loading";

const BookingInfo = () => {
	let { id } = useParams();
	const [booking, setBooking] = useState({});
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [btnPressed, setBtnPressed] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const holidays = [new Date("2023-12-25"), new Date("2024-01-01"), new Date("2023-12-31"), new Date("2023-12-24"), new Date("2023-11-23"), new Date("2023-07-04"), new Date("2023-09-04"), new Date("2023-10-31"), new Date("2023-05-29"), new Date("2023-02-20"),];

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
		let getUrl = `https://mane-frame-backend.onrender.com/findBooking/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setBooking(data.Booking);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	function update() {
		if (btnPressed) {
			setBtnPressed(false);
		} else {
			setBtnPressed(true);
		}
		console.log(btnPressed);
	}

	const oneYearFromNow = () => {
		const today = new Date();
		const nextYear = new Date(today);
		nextYear.setFullYear(today.getFullYear() + 1);
		return nextYear;
	};

	const isDisabled = (date) => {
		return date <= oneYearFromNow();
	};

	function changeApproved(id) {
		const getUrl = `https://mane-frame-backend.onrender.com/approve/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setBooking(data.Booking);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	function changeContacted(id) {
		const getUrl = `https://mane-frame-backend.onrender.com/contacted/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setBooking(data.Booking);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	const sendSelectedDateToBackend = () => {
		if (selectedDate) {
			const dateScheduled = selectedDate.toISOString().split("T")[0];
			const postData = {
				dateScheduled: dateScheduled, // Use the date part
			};
// https://mane-frame-backend.onrender.com
			fetch(`https://mane-frame-backend.onrender.com/updateDate/${booking._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			})
				.then((response) => response.json())
				.then((data) => {
					setBooking(data.Booking);
					setBtnPressed(false);
				})
				.catch((error) => {
					console.error("Error updating date:", error);
				});
		}
	};

	function subDays(date, days) {
		const result = new Date(date);
		result.setDate(date.getDate() - days);
		return result;
	}

	function isHoliday(date) {
		return holidays.some((holiday) => date.getTime() === holiday.getTime());
	}

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
					{loading ? ( // Display loading animation while loading is true
						<Loading />
					) : (
						<>
							{booking ? (
								<>
									<div className="bookingInfo">
										<div className="info">
											<h3>
												<b>Name:</b> {booking.Name}
											</h3>
											<h3>
												<b>Email:</b> {booking.Email}
											</h3>
											<h3>
												<b>Phone Number:</b> {booking.PhoneNumber}
											</h3>
											<h3 className="message">
												<b>Message:</b>{" "}
												{booking.Message
													? booking.Message
													: "No Message Attached"}
											</h3>
											<h3>
												<b>Location:</b> {booking.Location}
											</h3>
											<h3>
												<b>Session Type:</b> {booking.Session}
											</h3>
											<h3>
												<b>Approved: </b>
												{btnPressed ? (
													<>
														{booking.Approved ? "Yes" : "No"}{" "}
														<button
															className="btn smallBtn"
															onClick={() => changeApproved(booking._id)}
														>
															Approve
														</button>{" "}
													</>
												) : (
													<>{booking.Approved ? "Yes" : "No"}</>
												)}
											</h3>
											<h3>
												<b>Contacted: </b>
												{btnPressed ? (
													<>
														{booking.Contacted ? "Yes" : "No"}{" "}
														<button
															className="btn smallBtn"
															onClick={() => changeContacted(booking._id)}
														>
															Contacted
														</button>{" "}
													</>
												) : (
													<>{booking.Contacted ? "Yes" : "No"}</>
												)}
											</h3>
											<h3>
												<b>Date Request was sent:</b> {booking.DateBooked}
											</h3>
											<h3>
												<b>Scheduled Date:</b>
												{"    "}
												{btnPressed == true ? (
													<DatePicker
														selected={selectedDate}
														disabledKeyboard
														isClearable
														closeOnScroll={(e) => e.target === document}
														onChange={handleDateChange}
														dateFormat="yyyy-MM-dd"
														fixedHeight
														minDate={new Date()}
														placeholderText="Choose Date"
														filterDate={isDisabled}
														excludeDates={
															([new Date(), subDays(new Date(), 1)],
															holidays)
														}
														holidays={[
															{
																"date": "2023-12-31",
																"holidayName": "New Year's Eve"
															},
															{
																"date": "2023-12-25",
																"holidayName": "Christmas"
															},
															{
																"date": "2023-12-24",
																"holidayName": "Christmas Eve"
															},
															{
																"date": "2024-01-01",
																"holidayName": "New Year's Day"
															},
															{
																"date": "2023-11-23",
																"holidayName": "Thanksgiving Day"
															},
															{
																"date": "2023-07-04",
																"holidayName": "Independence Day"
															},
															{
																"date": "2023-09-04",
																"holidayName": "Labor Day"
															},
															{
																"date": "2023-10-31",
																"holidayName": "Halloween"
															},
															{
																"date": "2023-05-29",
																"holidayName": "Memorial Day"
															},
															{
																"date": "2023-02-20",
																"holidayName": "President's Day"
															}
														]}
													/>
												) : (
													<>
														{booking.DateScheduled
															? booking.DateScheduled
															: "No"}
													</>
												)}
											</h3>
											{btnPressed ? (
												<>
												<button
													className="btn"
													onClick={sendSelectedDateToBackend}
												>
													Update Info
												</button>
												<button className="btn" onClick={() => {setBtnPressed(false)}}>Cancel Updating</button>
												</>
											) : (
												<>
												<button className="btn" onClick={() => update()}>
													Change Info
												</button>
												
												</>
											)}
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
