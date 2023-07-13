import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

const Signin = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		criteriaMode: "all",
	});

	const passwordPattern =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;
	const validatePassword = (value) => {
		if (passwordPattern.test(value)) {
			return true;
		}
		return `Password must contain: \n 1 uppercase letter \n1 lowercase letter \n 1 number \n 1 special character`;
	};

	const initialFormData = {
		email: "",
		name: "",
		password: "",
	};

	const [formData, setFormData] = useState(initialFormData);
	const [msg, setMsg] = useState("");

	const handleFormData = (event) => {
		event.preventDefault();
		let url = `http://localhost:5000/signup`;
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
				console.log(msg);
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
		<div className="signup">
			<h1>Signup</h1>
			<div className="form">
				<div>
					<form onSubmit={handleFormData}>
						<label htmlFor="email">Email:</label>
						<br />
						<input
							value={formData.email}
							onChange={handleInputChange}
							id="email"
							name="email"
							type="email"
							placeholder="Email"
						/>
						<br />
						{/* <label htmlFor="email">Confirm Email:</label><br />
            <input value={formData.email} id='email' name='email' type='email' placeholder='Email' /><br /> */}
						<label htmlFor="name">Name:</label>
						<br />
						<input
							id="name"
							value={formData.name}
							onChange={handleInputChange}
							name="name"
							type="text"
							placeholder="Name"
						/>
						<br />
						<label htmlFor="password">Password:</label>
						<br />
						<input
							id="password"
							value={formData.password}
							onChange={handleInputChange}
							name="password"
							type="password"
							placeholder="Password"
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ messages }) => {
								console.log("messages", messages);
								return messages
									? Object.entries(messages).map(([type, message]) => (
											<p key={type} className="error" style={{whiteSpace: 'pre-line'}}>
												{message}
											</p>
									))
									: null;
							}}
						/>
						<br />
						{/* <label htmlFor="password">Confirm Password:</label><br />
            <input value={formData.password} id='password' name='password' type='password' placeholder='Password' /><br /> */}

						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
