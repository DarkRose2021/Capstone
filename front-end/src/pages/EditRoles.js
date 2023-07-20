import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const EditRoles = () => {
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

	const [checkboxes, setCheckboxes] = useState({
		Client: false,
		Admin: false,
		User: true,
	});
	let { id } = useParams();
	const [user, setUser] = useState(null);
	const [msg, setMsg] = useState(null);

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUser/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				console.log(data.User[0]);
				setUser(data.User[0]);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
		console.log(user);
	}, []);

	useEffect(() => {
		if (!user) return;

		if (user.Roles.includes("Client") && !user.Roles.includes("Admin")) {
			setCheckboxes({
				Client: true,
				Admin: false,
				User: true,
			});
		} else if (user.Roles.includes("Admin") && !user.Roles.includes("Client")) {
			setCheckboxes({
				Client: false,
				Admin: true,
				User: true,
			});
		} else if (user.Roles.includes("Admin") && user.Roles.includes("Client")) {
			setCheckboxes({
				Client: true,
				Admin: true,
				User: true,
			});
		} else {
			setCheckboxes({
				Client: false,
				Admin: false,
				User: true,
			});
		}
		console.log(checkboxes);
	}, [user]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let url = `http://localhost:5000/editRoles/${id}`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(checkboxes),
		})
			.then((data) => data.json())
			.then((data) => {
				setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	};

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setCheckboxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[name]: checked,
		}));
	};

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
					{user ? <h1>Editing {user.Name}'s Roles</h1> : <></>}
					<form onSubmit={handleSubmit}>
						<label>
							<input
								type="checkbox"
								name="Client"
								checked={checkboxes.Client}
								onChange={handleCheckboxChange}
							/>{" "}
							Client
						</label>
						<br />
						<label>
							<input
								type="checkbox"
								name="Admin"
								checked={checkboxes.Admin}
								onChange={handleCheckboxChange}
							/>{" "}
							Admin
						</label>
						<br />
						<label>
							<input
								type="checkbox"
								name="User"
								checked={checkboxes.User}
								onChange={handleCheckboxChange}
								disabled
							/>{" "}
							User
						</label>
						<br />
						<button type="submit">Submit</button>
					</form>
					{msg ? (
						<>
							<Navigate
								to={"/adminHome"}
								state={{ message: msg, name: user.Name }}
							/>
						</>
					) : (
						<br />
					)}
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

export default EditRoles;
