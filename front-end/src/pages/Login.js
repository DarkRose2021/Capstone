import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
	const location = useLocation();
	const initialFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(initialFormData);
	const [msg, setMsg] = useState("");

	const handleFormData = (event) => {
		event.preventDefault();

		let url = `http://localhost:5000/login`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setMsg(data.Message);
				
			})
			.catch((err) => console.log(err));

		setFormData(initialFormData);
	};
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<div className="login">
			{location.pathname.toLowerCase() === "/admin" ? (
				<h1>Admin Login</h1>
			) : (
				<h1>Login</h1>
			)}

			<div className="form">
				<div>
					<form onSubmit={handleFormData}>
						<label htmlFor="email">Email:</label>
						<br />
						<input value={formData.email} onChange={handleInputChange} id="email" name="email" type="email" placeholder="Email" />
						<br />
						<label htmlFor="password">Password:</label>
						<br />
						<input
							id="password"
							name="password"
							type="password"
              onChange={handleInputChange}
              value={formData.password}
							placeholder="Password"
						/>
						<br />
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
