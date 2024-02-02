import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../OnAllPages/Loading";
import DisplayUsers from "./DisplayUsers";
import DisplayEvents from "./DisplayEvents";
import DisplayBookings from "./DisplayBookings";

const Admin = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [events, setEvents] = useState([]);
	const [msg, setMsg] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [btnBookingPressed, setBtnBookingPressed] = useState(false);
	const [btnEventsPressed, setBtnEventsPressed] = useState(false);
	const [btnUserPressed, setBtnUserPressed] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

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

	function listUsers() {
		setSearchQuery("");
		setLoading(true);
		setBtnUserPressed(true);
		setBtnEventsPressed(false);
		setBtnBookingPressed(false);
		setBookings([]);
		setEvents([]);
		fetch("https://mane-frame-backend.onrender.com/listUsers")
			.then((response) => response.json())
			.then((result) => {
				setAllUsers(result);
				setLoading(false); // Set loading to false when the data is received
			});
	}

	function listEvents() {
		setLoading(true);
		setBtnUserPressed(false);
		setBtnBookingPressed(false);
		setBtnEventsPressed(true);
		setBookings([]);
		setAllUsers([]);
		fetch("https://mane-frame-backend.onrender.com/getSomeEvents")
			.then((response) => response.json())
			.then((result) => {
				console.log(result.Events);
				setEvents(result.Events);
				setLoading(false); // Set loading to false when the data is received
			});
	}

	useEffect(() => {
		// Update filteredUsers whenever allUsers changes or the searchQuery changes
		const filtered = allUsers.filter((user) =>
			user.Name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredUsers(filtered);
	}, [allUsers, searchQuery]);

	useEffect(() => {
		let filtered;
		if (searchQuery === "approved") {
			filtered = bookings.filter((booking) => booking.Approved === true);
		} else if (searchQuery === "notApproved") {
			filtered = bookings.filter((booking) => booking.Approved === false);
		} else if (searchQuery === "date") {
			filtered = bookings.filter(
				(booking) => booking.DateScheduled.trim().length !== 0
			);
		} else if (searchQuery === "noDate") {
			filtered = bookings.filter(
				(booking) => booking.DateScheduled.trim().length === 0
			);
		} else if (searchQuery === "clear") {
			setSearchQuery("");
		}
		setFilteredBookings(filtered);
	}, [bookings, searchQuery]);

	function deleteUser(id) {
		const getUrl = `https://mane-frame-backend.onrender.com/deleteUser/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setAllUsers(data.Users);
				setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	}

	function getBookings() {
		setSearchQuery("");
		setLoading(true);
		setAllUsers([]);
		setEvents([]);
		setBtnUserPressed(false);
		setBtnEventsPressed(false);
		setBtnBookingPressed(true);
		const getUrl = `https://mane-frame-backend.onrender.com/bookings`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setBookings(data.Bookings);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="admincontainer">
			{roles?.includes("Admin") ? (
				<>
					<div className="adminbtns">
						<div>
							<button onClick={getBookings}>Show Booking Requests</button>
							<button onClick={listUsers}>Show Users</button>
							<button onClick={listEvents}>Show Events</button>
						</div>
					</div>
					{loading ? ( // Display loading animation while loading is true
						<Loading />
					) : (
						<>
							<div>
								{allUsers.length > 0 ? (
									<>
										<div className="adminSearch">
											<div>
												<input
													type="text"
													placeholder="Search by Name"
													value={searchQuery}
													onChange={(e) => setSearchQuery(e.target.value)}
												/>
											</div>
										</div>
									</>
								) : (
									<></>
								)}

								<div className="users">
									{/* Users */}
									{searchQuery === "" && allUsers ? (
										<>
											{allUsers.map((user) => (
												<DisplayUsers
													key={user._id}
													user={user}
													deleteUser={deleteUser}
												/>
											))}
										</>
									) : bookings.length === 0 && filteredUsers.length > 0 ? (
										<>
											{filteredUsers.map((user) => (
												<DisplayUsers
													key={user._id}
													user={user}
													deleteUser={deleteUser}
												/>
											))}
										</>
									) : (
										<></>
									)}
								</div>

								<div className="users">
									{/* Events */}
									{events && btnEventsPressed ? (
										<>
											{events.length > 0 ? (
												<>
													{events.map((event) => (
														<DisplayEvents key={event._id} event={event} />
													))}
												</>
											) : (
												<>
													<h1>No Booking Requests</h1>
												</>
											)}
										</>
									) : (
										<></>
									)}
								</div>

								{bookings.length > 0 ? (
									<>
										<div className="filterBookings">
											<div>
												<select
													value={searchQuery}
													defaultValue=""
													onChange={(e) => setSearchQuery(e.target.value)}
												>
													<option value={""} hidden disabled>
														Filter Bookings By:
													</option>
													<option value={"approved"}>Approved</option>
													<option value={"notApproved"}>Not Approved</option>
													<option value={"date"}>Date Scheduled</option>
													<option value={"noDate"}>Date Not Scheduled</option>
													<option value={"clear"}>Clear Filter</option>
												</select>
											</div>
										</div>
									</>
								) : (
									<></>
								)}

								<div className="users">
									{/* Bookings */}
									{searchQuery === "" && bookings ? (
										<>
											{bookings && btnBookingPressed ? (
												<>
													{bookings.length > 0 ? (
														<>
															{bookings.map((booking) => (
																<DisplayBookings
																	key={booking._id}
																	booking={booking}
																/>
															))}
														</>
													) : (
														<>
															<h1>No Booking Requests</h1>
														</>
													)}
												</>
											) : (
												<></>
											)}
										</>
									) : filteredBookings ? (
										<>
											{filteredBookings.length > 0 ? (
												filteredBookings.map((booking) => (
													<DisplayBookings
														key={booking._id}
														booking={booking}
													/>
												))
											) : (
												<p className="error">No matching bookings found.</p>
											)}
										</>
									) : (
										<></>
									)}
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
					{/* <Navigate to={"/admin"} /> */}
				</>
			)}
		</div>
	);
};

export default Admin;
