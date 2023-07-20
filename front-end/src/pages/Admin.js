import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Admin = () => {
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
		return () => window.removeEventListener("storage", handleStorage());
	}, []);

	const [allUsers, setAllUsers] = useState([]);

	function listUsers() {
		fetch("http://localhost:5000/listUsers")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAllUsers(result);
			});
	}

	function listClients() {
		fetch("http://localhost:5000/listClients")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAllUsers(result);
			});
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
						{/* show the clients when either button is clicked (might change to showing clients by default)*/}
						{/* when client is clicked it'll bring up their "page" ie, their images */}
						{/* options for admin to add or delete imgs from the client's page */}
						{allUsers.length > 0 ? (
							allUsers.map((user) => (
								<div key={user._id}>
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
									{user.Roles?.includes("Client") ? (
										<button>Edit Pictures</button>
									) : (
										<></>
									)}
								</div>
							))
						) : (
							<></>
						)}
					</div>
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
					<Navigate to={"/adminLogin"} />
				</>
			)}
		</div>
	);
};

export default Admin;
