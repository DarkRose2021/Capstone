import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const BookingForm = () => {
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		watch,
		reset,
	} = useForm({
		criteriaMode: "all",
	});
	const [currentDate, setCurrentDate] = useState(new Date());
	const [message, setMessage] = useState("");

	useEffect(() => {
		// Function to update the date every second
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 3600000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	}, []);

	const formattedDate = currentDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const namePattern = /^[A-Za-z\s]+$/;
	const validateName = (value) => {
		if (namePattern.test(value)) {
			return true;
		}
		return "Name must only contain letters";
	};

	const onSubmit = (data) => {
		data.date = formattedDate;

		if (isSubmitting) {
			return;
		}

		fetch("https://mane-frame-backend.onrender.com/bookingInfo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result)
				setMessage("Data submitted successfully!");
				reset();
				setTimeout(() => {
					setMessage("");
				}, 3000);
			})
			.catch((error) => {
				setMessage("An error occurred. Please try again.");
				console.error(error);
			});
	};

	return (
		<div className="booking">
			<h1>Booking Request</h1>
			<div className="form">
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="name">
							Full Name<span className="required">*</span>
						</label>
						<br />
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Full Name"
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
						<label htmlFor="email">
							Email<span className="required">*</span>
						</label>
						<br />
						<input
							id="email"
							name="email"
							type="email"
							placeholder="example@mail.com"
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
						<label htmlFor="phnumber">
							Phone Number<span className="required">*</span>
						</label>
						<br />
						<input
							id="phnumber"
							name="phnumber"
							type="tel"
							placeholder="123-456-7890"
							{...register("phnumber", {
								required: "Phone Number is required",
								pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="phnumber"
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
						<label htmlFor="location">
							Location<span className="required">*</span>
						</label>
						<br />
						<input
							id="location"
							name="location"
							type="text"
							placeholder="Vague Area"
							{...register("location", {
								required: "Location is required",
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="location"
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
						<label htmlFor="msg">Message</label>
						<br />
						<textarea
							id="msg"
							name="msg"
							{...register("msg", {
								required: false,
								maxLength: {
									value: 1000,
									message: "Message must not exceed 1000 characters",
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="msg"
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
						<label htmlFor="session">
							Type of session you are interested in?
							<span className="required">*</span>
						</label>
						<br />
						<select
							id="session"
							name="session"
							defaultValue=""
							{...register("session", {
								required: "You must select an option",
							})}
						>
							<option value={""} disabled>
								Select One
							</option>
							<option value={"Equine portrait"}>Equine portrait</option>
							<option value={"Event photography"}>Event photography</option>
							<option value={"Fine art photography"}>
								Fine art photography
							</option>
							<option value={"Advertising and marketing photography"}>
								Advertising and marketing photography
							</option>
							<option value={"Editorial and journalistic photography"}>
								Editorial and journalistic photography
							</option>
							<option value={"Equine lifestyle photography"}>
								Equine lifestyle photography
							</option>
							<option value={"other"}>Other</option>
						</select>
						<ErrorMessage
							errors={errors}
							name="session"
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
						<label htmlFor="hearAbout">How did you hear about me?</label>
						<br />
						<select
							id="hearAbout"
							name="hearAbout"
							defaultValue=""
							{...register("hearAbout")}
						>
							<option value={""} disabled>
								Select One
							</option>
							<option value={"facebook"}>Facebook</option>
							<option value={"instagram"}>Instagram</option>
							<option value={"word of mouth"}>Word of Mouth</option>
							<option value={"website"}>Website</option>
							<option value={"other"}>Other</option>
						</select>
						<label hidden htmlFor="date"></label>
						<input
							type="text"
							hidden
							id="date"
							name="date"
							value={formattedDate}
							disabled
							{...register("date")}
						/>
						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>
					</form>
					{message && <p className="sub">{message}</p>}
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
