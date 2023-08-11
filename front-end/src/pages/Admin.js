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
		fetch("http://localhost:5000/listUsers")
			.then((response) => response.json())
			.then((result) => {
				setAllUsers(result);
			});
	}

	function listClients() {
		fetch("http://localhost:5000/listClients")
			.then((response) => response.json())
			.then((result) => {
				setAllUsers(result);
			});
	}

	function deleteUser(id) {
		const getUrl = `http://localhost:5000/deleteUser/${id}`;
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
						<div className="adminbtns">
							<div>
								<button onClick={listClients}>List Clients</button>
								<button onClick={listUsers}>List Users</button>
							</div>
						</div>
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
