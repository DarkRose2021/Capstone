import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const BookingForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (data) => {
		fetch("http://localhost:5000/bookingInfo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result) => {
				// setUser(result);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<div className="booking">
			<h1>Booking Information</h1>
			<div className="form">
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="name">Full Name</label>
						<br />
						<input
							id="name"
							name="name"
							type="text"
							{...register("name", {
								required: "Name is required",
								// validate: validateName,
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
						<br />
						<label htmlFor="email">Email</label>
						<br />
						<input
							id="email"
							name="email"
							type="email"
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
						<br />
						<label htmlFor="phnumber">Phone Number</label>
						<br />
						<input
							id="phnumber"
							name="phnumber"
							type="tel"
							{...register("phnumber", {
								required: "Phone Number is required",
                                pattern: /[0-9]{3}[0-9]{3}[0-9]{4}/,
								minLength: 7,
                                maxLength: 7
							})}
						/>
						<br />
						<label htmlFor="location">Location</label>
						<br />
						<input
							id="location"
							name="location"
							type="text"
							{...register("location", {
								required: "Phone Number is required",
								
							})}
						/>
						<br />
						<label htmlFor="msg">Message</label>
						<br />
						<textarea
							id="msg"
							name="msg"
							{...register("msg")}
						/>
						<br />
						<label htmlFor="session">
							Type of session you are interested in?
						</label>
						<br />
						<select
							id="session"
							name="session"
							{...register("session", {
								required: true,
							})}
						>
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
						<br />
						<label htmlFor="hearAbout">How did you hear about me?</label>
						<br />
						<select id="hearAbout" name="hearAbout" {...register("hearAbout")}>
							<option>Select One</option>
							<option value={"facebook"}>Facebook</option>
							<option value={"instagram"}>Instagram</option>
							<option value={"word of mouth"}>Word of Mouth</option>
							<option value={"website"}>Website</option>
							<option value={"other"}>Other</option>
						</select>
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
