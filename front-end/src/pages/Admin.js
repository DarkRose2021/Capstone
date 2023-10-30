import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Admin = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [msg, setMsg] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
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
		setLoading(true);
		setBookings([]);
		fetch("https://mane-frame-backend.onrender.com/listUsers")
			.then((response) => response.json())
			.then((result) => {
				setAllUsers(result);
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

	function deleteUser(id) {
		const getUrl = `https://mane-frame-backend.onrender.com/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setAllUsers(data.Users);
				setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	}

	function getBookings() {
		setLoading(true);
		setAllUsers([]);
		const getUrl = `https://mane-frame-backend.onrender.com/bookings`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setBookings(data.Bookings);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	function changeApproved(id) {
		const getUrl = `https://mane-frame-backend.onrender.com/approve/${id}`;
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
						</div>
					</div>
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
									{searchQuery === "" ? (
										allUsers.map((user) => (
											<div key={user._id} className="user">
												<h3>Name: {user.Name}</h3>
												<h3>Email: {user.Email}</h3>
												<h3>
													Roles:{" "}
													{user.Roles?.map((role, index) => (
														<>{role}, </>
													))}
												</h3>
												<h3>Disabled: {user.Disabled ? "Yes" : "No"}</h3>

												<Link to={`/edit/${user._id}`}>
													<button>Edit Roles</button>
												</Link>
												<button onClick={() => deleteUser(user._id)}>
													{user.Disabled ? "Enable User" : "Disable User"}
												</button>
												{user.Roles?.includes("Client") ? (
													<Link to={`/editImages/${user._id}`}>
														<button>Edit Pictures</button>
													</Link>
												) : (
													<></>
												)}
												{user.Roles?.includes("Client") ? (
													<Link to={`/ShowImages/${user._id}`}>
														<button>Show Pictures</button>
													</Link>
												) : (
													<></>
												)}
											</div>
										))
									) : filteredUsers.length > 0 ? (
										filteredUsers.map((user) => (
											<div key={user._id} className="user">
												<h3>Name: {user.Name}</h3>
												<h3>Email: {user.Email}</h3>
												<h3>
													Roles:{" "}
													{user.Roles?.map((role, index) => (
														<>{role}, </>
													))}
												</h3>
												<h3>Disabled: {user.Disabled ? "Yes" : "No"}</h3>

												<Link to={`/edit/${user._id}`}>
													<button>Edit Roles</button>
												</Link>
												<button onClick={() => deleteUser(user._id)}>
													{user.Disabled ? "Enable User" : "Disable User"}
												</button>
												{user.Roles?.includes("Client") ? (
													<Link to={`/editImages/${user._id}`}>
														<button>Edit Pictures</button>
													</Link>
												) : (
													<></>
												)}
												{user.Roles?.includes("Client") ? (
													<Link to={`/ShowImages/${user._id}`}>
														<button>Show Pictures</button>
													</Link>
												) : (
													<></>
												)}
											</div>
										))
									) : (
										<p>No matching users found.</p>
									)}
								</div>

								<div className="users">
									{bookings.length > 0 ? (
										<>
											{bookings.map((booking) => (
												<div key={booking._id} className="user">
													<h3>Sender's Name: {booking.Name}</h3>
													<h3>Sender's Email: {booking.Email}</h3>
													<h3>Approved: {booking.Approved ? "Yes" : "No"}</h3>
													<h3>Contacted: {booking.Contacted ? "Yes" : "No"}</h3>
													<h3>Date Requested: {booking.DateBooked}</h3>
													<Link to={`/BookingInfo/${booking._id}`}>
														<button>View More Info</button>
													</Link>
													<button onClick={() => changeApproved(booking._id)}>
														Approve
													</button>
												</div>
											))}
										</>
									) : (
										<>
											<h1>No Booking Requests</h1>
										</>
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
