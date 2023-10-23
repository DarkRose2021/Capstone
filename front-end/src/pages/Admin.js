import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Admin = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [msg, setMsg] = useState(null);

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0) {
				setLoggedIn(true);
				setRoles(localStorage.getItem("Roles"));
			}
		};

		window.addEventListener("storage", handleStorage());
		return () => window.removeEventListener("storage", handleStorage());
		
	}, []);

	function listUsers() {
		fetch("https://mane-frame-backend.onrender.com/listUsers")
			.then((response) => response.json())
			.then((result) => {
				setAllUsers(result);
			});
	}

	useEffect(() =>{
		listUsers();
	}, [])

	// change to disabling the user
	// if user tries to log in then send a msg saying that the account has been disabled, put contact info
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

	return (
		<div className="admincontainer">
			{roles?.includes("Admin") ? (
				<>
					<div>
						{msg?( <div className="userMsg">User was Deleted</div>):(<></>)}
						<div className="users">
							{allUsers.length > 0 ? (
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

										<Link to={`/edit/${user._id}`}>
											<button>Edit Roles</button>
										</Link>
										<button onClick={() => deleteUser(user._id)}>
											Delete User
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
								<></>
							)}
						</div>
					</div>
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
