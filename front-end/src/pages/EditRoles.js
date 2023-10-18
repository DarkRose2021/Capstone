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
		let getUrl = `https://mane-frame-backend.onrender.com/findUser/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User[0]);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
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
	}, [user]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let url = `https://mane-frame-backend.onrender.com/editRoles/${id}`;
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
					<div className="role_flex">
					<form onSubmit={handleSubmit} className="checkbox_form">
						<label>
							<input
								type="checkbox"
								className="form-check-input"
								name="Client"
								checked={checkboxes.Client}
								onChange={handleCheckboxChange}
							/>{" "}
							Client
						</label>
						<br />
						<label>
							<input
							className="form-check-input"
								type="checkbox"
								name="Admin"
								checked={checkboxes.Admin}
								onChange={handleCheckboxChange}
							/>{" "}
							Admin
						</label>
						<br />
						<label className="disabled">
							<input className="disabled form-check-input"
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
						<></>
					)}
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

export default EditRoles;
