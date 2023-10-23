import React, { useState, useEffect } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [user, SetUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [checkStorage, setCheckStorage] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		criteriaMode: "all",
	});

	const location = useLocation();

	const onSubmit = (data) => {
		setLoading(true)
		fetch(`https://mane-frame-backend.onrender.com/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				SetUser(result);
				setLoading(false); // Set loading to false when the data is received
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		const data = window.localStorage.getItem("Valid Email", "Roles");
		if (data !== null) setCheckStorage(true);
	}, []);

	useEffect(() => {
		if (user && user.Message !== "Invalid Email or password" && user.User) {
			window.localStorage.setItem(
				"Valid Email",
				JSON.stringify(user.User.Email)
			);
			window.localStorage.setItem("Roles", JSON.stringify(user.User.Roles));
			window.localStorage.setItem("Name", JSON.stringify(user.User.Name));
			navigate(0);
		}
	}, [user]);

	return (
		<div className="login">
			{loading ? ( // Display loading animation while loading is true
				<div className="loading-container">
					<div className="loadingio-spinner-spinner-la1rcf32xa">
						<div className="ldio-t5ijoz38lif">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			) : (
				<>
					{location.pathname.toLowerCase() === "/admin" ? (
						<h1>Admin Login</h1>
					) : (
						<h1>Login</h1>
					)}

					<div className="form">
						<div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<label htmlFor="email">
									Email<span className="required">*</span>
								</label>
								<br />
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Email address is invalid",
										},
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="email"
									render={({ messages }) =>
										messages
											? Object.entries(messages).map(([type, message]) => (
													<p key={type} className="error">
														{message}
													</p>
											  ))
											: null
									}
								/>
								<br />
								<label htmlFor="password">
									Password<span className="required">*</span>
								</label>
								<br />
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"} // Toggle between text and password type
									placeholder="Password"
									{...register("password", {
										required: "Password is required",
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="password"
									render={({ messages }) =>
										messages
											? Object.entries(messages).map(([type, message]) => (
													<p
														key={type}
														className="error"
														style={{ whiteSpace: "pre-line" }}
													>
														{message}
													</p>
											  ))
											: null
									}
								/>
								<br />
								<label className="form-check-label show_pass">
									<input
										type="checkbox"
										className="form-check-input"
										checked={showPassword}
										onChange={() => setShowPassword(!showPassword)} // Toggle the showPassword state on checkbox change
									/>{" "}
									Show Password
								</label>
								<br />
								{user?.Message === "Invalid Email or password" ? (
									<p className="error">{user?.Message}</p>
								) : user?.Users !== null && user?.Message ? (
									<>
										<p>Successfully logged in</p>
										{/* make it redirect to either the admin home or the client pics base on what role they have */}
										<Navigate to={"/"} />
									</>
								) : (
									<></>
								)}

								<button type="submit">Login</button>
							</form>
							<Link to={"/signup"}>Don't have an account? Sign Up!</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;
