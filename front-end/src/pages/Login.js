import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, Form, useController } from "react-hook-form";
// import { Form, Button } from "semantic-ui-react";

const Login = () => {
	const { register,handleSubmit,formState: { errors }, } = useForm();
	const { field } = useController({
		control: control,
		name: "email",
		rules: {
		  required: true,
		  pattern: /^[a-zA-Z0-9]+$/i
		}
	});
	const location = useLocation();
	// const initialFormData = {
	// 	email: "",
	// 	password: "",
	// };

	// const [formData, setFormData] = useState(initialFormData);
	// const [msg, setMsg] = useState("");

	// const handleFormData = (event) => {
	// 	event.preventDefault();

	// 	let url = `http://localhost:5000/login`;
	// 	fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(formData),
	// 	})
	// 		.then((data) => data.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setMsg(data.Message);
	// 		})
	// 		.catch((err) => console.log(err));

	// 	setFormData(initialFormData);
	// };
	// const handleInputChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setFormData((prevState) => ({
	// 		...prevState,
	// 		[name]: value,
	// 	}));
	// };
	return (
		<div className="login">
			{location.pathname.toLowerCase() === "/admin" ? (
				<h1>Admin Login</h1>
			) : (
				<h1>Login</h1>
			)}

			<div className="form">
				<div>
					{/* <Form> */}
					<Form onSubmit={handleSubmit()}>
							<label htmlFor="email">Email:</label>
							<br />
							<input
								// value={formData.email}
								// onChange={handleInputChange}
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								{...register("email", {
									required: true,
									pattern:
										/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										minLength: 6,
										maxLength: 100
								})}
							/>
							
						{errors.email && <p>Please check the First Name</p>}

						<br />

							<label htmlFor="password">Password:</label>
							<br />
							<input
								id="password"
								name="password"
								type="password"
								// onChange={handleInputChange}
								// value={formData.password}
								placeholder="Password"
								{...register("password", { 
									required: true, 
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
									minLength: 8,
									
								})}
							/>
						{errors.password && <p>Please check the Password</p>}
						<br />
						<button type="submit">Login</button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Login;
