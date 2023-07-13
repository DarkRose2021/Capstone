import React, { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

const Login = () => {


	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		criteriaMode: "all",
	});
	const location = useLocation();

	return (
		<div className="login">
			{location.pathname.toLowerCase() === "/admin" ? (
				<h1>Admin Login</h1>
			) : (
				<h1>Login</h1>
			)}

			<div className="form">
				<div>
					<form onSubmit={handleSubmit((data) => console.log(data))}>
						<label htmlFor="email">Email:</label>
						<br />
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							{...register("email", {
								required: "You must enter an email address",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Email address is invalid",
								},
								minLength: {
									value: 5,
									message: "Email must be more than 5 characters long",
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="email"
							render={({ messages }) => {
								console.log("messages", messages);
								return messages
									? Object.entries(messages).map(([type, message]) => (
											<p key={type} className="error">
												{message}
											</p>
									))
									: null;
							}}
						/>
						<br />

						<label htmlFor="password">Password:</label>
						<br />
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							{...register("password", {
								required: "Password is required",
							})}
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
