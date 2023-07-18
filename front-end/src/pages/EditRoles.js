import React from "react";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

const EditRoles = () => {
	const [checkboxes, setCheckboxes] = useState({
		client: false,
		admin: false,
		user: false,
	});
	let { id } = useParams();
	const [user, setUser] = useState([]);

	console.log("id: " + id);

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
        console.log(user)
	}, []);

	useEffect(() => {
		if (user.Roles.includes("Client") && !user.Roles.includes("Admin")) {
			setCheckboxes({
				client: true,
				admin: false,
				user: true,
			});
		} else if (user.Roles.includes("Admin") && !user.Roles.includes("Client")) {
			setCheckboxes({
				client: false,
				admin: true,
				user: true,
			});
		} else if (user.Roles.includes("Admin") && user.Roles.includes("Client")) {
			setCheckboxes({
				client: true,
				admin: true,
				user: true,
			});
		} else {
			setCheckboxes({
				client: false,
				admin: false,
				user: true,
			});
		}
        console.log(checkboxes)
	}, [user]);

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setCheckboxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[name]: checked,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(checkboxes);
	};

	return (
		<div>
			<h1>Editing {user.Name} Roles</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type="checkbox"
						name="client"
						checked={checkboxes.client}
						onChange={handleCheckboxChange}
					/>{" "}
					Client
				</label>
				<br />
				<label>
					<input
						type="checkbox"
						name="admin"
						checked={checkboxes.admin}
						onChange={handleCheckboxChange}
					/>{" "}
					Admin
				</label>
				<br />
				<label>
					<input
						type="checkbox"
						name="user"
						checked={checkboxes.user}
						onChange={handleCheckboxChange}
						disabled
					/>{" "}
					User
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EditRoles;
