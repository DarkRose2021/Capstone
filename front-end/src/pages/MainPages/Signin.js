import React, { useState, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Navigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signin = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		criteriaMode: "all",
	});
	const [showPassword, setShowPassword] = useState(false);

	const passwordPattern =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;
	const validatePassword = (value) => {
		if (passwordPattern.test(value)) {
			return true;
		}
		return `Password must contain: \n 1 uppercase letter \n1 lowercase letter \n 1 number \n 1 special character`;
	};

	const namePattern = /^[A-Za-z\s]+$/;
	const validateName = (value) => {
		if (namePattern.test(value)) {
			return true;
		}
		return "Name must only contain letters";
	};

	const [user, setUser] = useState({});
	const [checkStorage, setCheckStorage] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState();
	const [emailMatch, setEmailMatch] = useState();

	useEffect(() => {
		setPasswordMatch(watch("password", "") === watch("confirmPassword", ""));
		setEmailMatch(watch("email", "") === watch("confirmEmail", ""));
	}, [watch]);

	const onSubmit = (data) => {
		setLoading(true);
		fetch("https://mane-frame-backend.onrender.com/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				setUser(result);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		const data = window.localStorage.getItem("Valid Email", "Roles");
		if (data !== null) setCheckStorage(true);
	}, []);

	useEffect(() => {
		if (user && user.Message && user.User) {
			window.localStorage.setItem(
				"Valid Email",
				JSON.stringify(user.User[0].Email)
			);
			window.localStorage.setItem("Roles", JSON.stringify(user.User[0].Roles));
			window.localStorage.setItem("Name", JSON.stringify(user.User[0].Name));
			navigate(0);
		}
	}, [user]);

	return (
		<div className="signup">
			<h1>Signup</h1>
			<div className="form">
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="email">Email<span className="required">*</span></label>
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
								minLength: {
									value: 5,
									message: "Email must be longer than 5 characters",
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

						<label htmlFor="confirmEmail">Confirm Email<span className="required">*</span></label>
						<br />
						<input
							id="confirmEmail"
							name="confirmEmail"
							type="email"
							placeholder="Confirm Email"
							{...register("confirmEmail", {
								required: "Email is required",
								validate: (value) =>
									value === watch("email", "") || "Emails do not match",
							})}
						/>
						{emailMatch ? null : <p className="error">Emails do not match</p>}
						<ErrorMessage
							errors={errors}
							name="confirmEmail"
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

						<label htmlFor="name">Name<span className="required">*</span></label>
						<br />
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Name"
							{...register("name", {
								required: "Name is required",
								validate: validateName,
								minLength: {
									value: 2,
									message: "Name can't be shorter than 2 characters",
								},
								maxLength: {
									value: 100,
									message: "Name cannot exceed 100 characters",
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="name"
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

						<label htmlFor="password">Password<span className="required">*</span></label>
						<br />
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							{...register("password", {
								required: "Password is required",
								validate: validatePassword,
								minLength: {
									value: 8,
									message: "Must be longer than 8 characters",
								},
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
						<label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
						<br />
						<input
							id="confirmPassword"
							name="confirmPassword"
							type={showPassword ? "text" : "password"}
							placeholder="Confirm Password"
							{...register("confirmPassword", {
								required: "Confirm Password is required",
								validate: (value) =>
									value === watch("password", "") || "Passwords do not match",
							})}
						/>
						{passwordMatch ? null : (
							<p className="error">Passwords do not match</p>
						)}
						<ErrorMessage
							errors={errors}
							name="confirmPassword"
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
						{(user.User === "" || user.User === null) && user.Message ? (
							<p className="error">{user.Message}</p>
						) : (
							<></>
						)}

						{user.Users !== "" && user.Message ? (
							<>
								<p>Successfully Signed Up</p>
								{/* make it redirect to either the admin home or the client pics base on what role they have */}
								<Navigate to={"/"} />
							</>
						) : (
							<></>
						)}
						<button type="submit">Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
