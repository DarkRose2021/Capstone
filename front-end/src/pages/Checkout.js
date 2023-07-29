import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Popup from "./Popup";

const Checkout = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [sameAsBilling, setSameAsBilling] = useState(false);
	const { register, handleSubmit, errors } = useForm();
	const [showPopup, setShowPopup] = useState(false);
	const [sendData, setSendData] = useState(null);

	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/confirm`;
		navigate(path, { state: { data: sendData }});
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		localStorage.setItem("popupShown", "true");
		routeChange();
	};

	const cardNumberPattern =
		/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
	const ccvPattern = /^[0-9]{3,4}$/;
	const zipPattern = /^\d{5}$/;
	const namePattern = /^[A-Za-z\s]+$/;
	const validateName = (value) => {
		if (namePattern.test(value)) {
			return true;
		}
		return "Name must only contain letters";
	};

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

	const handleCheckboxChange = (event) => {
		setSameAsBilling(event.target.checked);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const form = event.currentTarget;
		if (form.checkValidity()) {
			// Collect form data
			const data = {};
			const elements = form.elements;
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				if (element.tagName === "INPUT" || element.tagName === "SELECT") {
					if (element.id === "ccExpiration") {
						// Convert the Date object to "yyyy-mm" format first
						const expirationDate = new Date(element.value);
						const month = String(expirationDate.getMonth() + 1).padStart(
							2,
							"0"
						);
						const year = expirationDate.getFullYear();
						data[element.id] = `${year}-${month}`;
					} else {
						data[element.id] = element.value;
					}
				}
			}

			const endpoint = `http://localhost:5000/checkout`;

			// Use the fetch API to post the data to the backend
			fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((responseData) => {
					console.log(responseData);
					setSendData(responseData.Body);
					setShowPopup(true);
				})
				.catch((error) => {
					// Handle any errors that occurred during the fetch request
					console.error("Error posting form data:", error);
				});
		}

		form.classList.add("was-validated");
	};

	return (
		<div className="container">
			{showPopup && (
				<Popup
					message="Form Submitted! This information will not be saved, you will not actually receive a product, and your card won't actually be charged."
					onClose={handleClosePopup}
				/>
			)}
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					<main>
						<div className="py-5 text-center">
							<h1>Checkout</h1>
						</div>

						<div className="row g-5 checkoutform">
							<div className="col-md-5 col-lg-4 order-md-last ">
								<h4 className="d-flex justify-content-between align-items-center mb-3">
									<span className="">Your cart</span>
									<span className="badge bg-primary rounded-pill">3</span>
								</h4>
								<ul className="list-group mb-3 cart">
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Product name</h6>
											<small className="">Brief description</small>
										</div>
										<span className="">$12</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Second product</h6>
											<small className="">Brief description</small>
										</div>
										<span className="">$8</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Third item</h6>
											<small className="">Brief description</small>
										</div>
										<span className="">$5</span>
									</li>
									<li className="list-group-item d-flex justify-content-between total">
										<span>Total (USD)</span>
										<strong>$20</strong>
									</li>
								</ul>
							</div>
							<div className="col-md-7 col-lg-8">
								<h4 className="mb-3">Billing address</h4>
								<form
									className="needs-validation"
									noValidate
									onSubmit={handleFormSubmit}
								>
									<div className="row g-3">
										<div className="col-sm-6">
											<label htmlFor="firstName" className="form-label">
												First name
											</label>
											<input
												type="text"
												className="form-control"
												id="firstName"
												placeholder="First Name"
												required
												{...register("firstName", {
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
											<div className="invalid-feedback">
												Valid first name is required.
											</div>
										</div>

										<div className="col-sm-6">
											<label htmlFor="lastName" className="form-label">
												Last name
											</label>
											<input
												type="text"
												className="form-control"
												id="lastName"
												required
												placeholder="Last Name"
												{...register("lastName", {
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
											<div className="invalid-feedback">
												Valid last name is required.
											</div>
										</div>

										<div className="col-12">
											<label htmlFor="email" className="form-label">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												id="email"
												required
												placeholder="you@example.com"
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
											<div className="invalid-feedback">
												Please enter a valid email address for shipping updates.
											</div>
										</div>

										<div className="col-12">
											<label htmlFor="address" className="form-label">
												Address
											</label>
											<input
												type="text"
												className="form-control"
												id="address"
												placeholder="1234 Main St"
												required
											/>
											<div className="invalid-feedback">
												Please enter your shipping address.
											</div>
										</div>

										<div className="col-12">
											<label htmlFor="address2" className="form-label">
												Address 2 <span className="text-muted">(Optional)</span>
											</label>
											<input
												type="text"
												className="form-control"
												id="address2"
												placeholder="Apartment or suite"
											/>
										</div>

										<div className="col-md-5">
											<label htmlFor="country" className="form-label">
												Country
											</label>
											<select className="form-select" id="country" required>
												<option value="">Choose...</option>
												<option>United States</option>
											</select>
											<div className="invalid-feedback">
												Please select a valid country.
											</div>
										</div>

										<div className="col-md-4">
											<label htmlFor="state" className="form-label">
												State
											</label>
											<select className="form-select" id="state" required>
												<option value="">Choose...</option>
												<option>Alabama</option>
												<option>Alaska</option>
												<option>Arizona</option>
												<option>Arkansas</option>
												<option>California</option>
												<option>Colorado</option>
												<option>Connecticut</option>
												<option>Delaware</option>
												<option>Florida</option>
												<option>Georgia</option>
												<option>Hawaii</option>
												<option>Idaho</option>
												<option>Illinois</option>
												<option>Indiana</option>
												<option>Iowa</option>
												<option>Kansas</option>
												<option>Kentucky</option>
												<option>Louisiana</option>
												<option>Maine</option>
												<option>Maryland</option>
												<option>Massachusetts</option>
												<option>Michigan</option>
												<option>Minnesota</option>
												<option>Mississippi</option>
												<option>Missouri</option>
												<option>Montana</option>
												<option>Nebraska</option>
												<option>Nevada</option>
												<option>New Hampshire</option>
												<option>New Jersey</option>
												<option>New Mexico</option>
												<option>New York</option>
												<option>North Carolina</option>
												<option>North Dakota</option>
												<option>Ohio</option>
												<option>Oklahoma</option>
												<option>Oregon</option>
												<option>Pennsylvania</option>
												<option>Rhode Island</option>
												<option>South Carolina</option>
												<option>South Dakota</option>
												<option>Tennessee</option>
												<option>Texas</option>
												<option>Utah</option>
												<option>Vermont</option>
												<option>Virginia</option>
												<option>Washington</option>
												<option>West Virginia</option>
												<option>Wisconsin</option>
												<option>Wyoming</option>
											</select>
											<div className="invalid-feedback">
												Please provide a valid state.
											</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="zip" className="form-label">
												Zip
											</label>
											<input
												type="text"
												className={`form-control ${
													errors?.zip ? "is-invalid" : ""
												}`}
												id="zip"
												name="zip"
												required
												{...register("zip", {
													required: "Zip code is required",
													pattern: {
														value: zipPattern,
														message: "Invalid zip code",
													},
												})}
												placeholder=""
											/>
											{errors?.zip && (
												<div className="invalid-feedback">
													{errors?.zip.message}
												</div>
											)}
										</div>
									</div>

									<hr className="my-4" />

									<div className="form-check">
										<input
											type="checkbox"
											className="form-check-input"
											id="sameAddress"
											checked={sameAsBilling}
											onChange={handleCheckboxChange}
										/>
										<label className="form-check-label" htmlFor="sameAddress">
											Shipping address is the same as my billing address
										</label>
									</div>

									{sameAsBilling ? (
										<></>
									) : (
										// Render the editable billing address fields if sameAsBilling is false

										<>
											<hr className="my-4" />
											<div className="form-check">
												<h4 className="mb-3">Shipping address</h4>
												<div className="row g-3">
													<div className="col-sm-6">
														<label
															htmlFor="shipFirstName"
															className="form-label"
														>
															First name
														</label>
														<input
															type="text"
															className="form-control"
															id="shipFirstName"
															placeholder="First Name"
															required
															{...register("shipFirstName", {
																required: "Name is required",
																validate: validateName,
																minLength: {
																	value: 2,
																	message:
																		"Name can't be shorter than 2 characters",
																},
																maxLength: {
																	value: 100,
																	message: "Name cannot exceed 100 characters",
																},
															})}
														/>
														<div className="invalid-feedback">
															Valid first name is required.
														</div>
													</div>

													<div className="col-sm-6">
														<label
															htmlFor="shipLastName"
															className="form-label"
														>
															Last name
														</label>
														<input
															type="text"
															className="form-control"
															id="shipLastName"
															placeholder="Last Name"
															required
															{...register("shipLastName", {
																required: "Name is required",
																validate: validateName,
																minLength: {
																	value: 2,
																	message:
																		"Name can't be shorter than 2 characters",
																},
																maxLength: {
																	value: 100,
																	message: "Name cannot exceed 100 characters",
																},
															})}
														/>
														<div className="invalid-feedback">
															Valid last name is required.
														</div>
													</div>

													<div className="col-12">
														<label htmlFor="shipEmail" className="form-label">
															Email
														</label>
														<input
															type="email"
															className="form-control"
															id="shipEmail"
															required
															placeholder="you@example.com"
															{...register("shipEmail", {
																required: "Email is required",
																pattern: {
																	value:
																		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
																	message: "Email address is invalid",
																},
																minLength: {
																	value: 5,
																	message:
																		"Email must be longer than 5 characters",
																},
															})}
														/>
														<div className="invalid-feedback">
															Please enter a valid email address htmlFor
															shipping updates.
														</div>
													</div>

													<div className="col-12">
														<label
															htmlFor="shipAddress"
															className="form-label"
														>
															Address
														</label>
														<input
															type="text"
															className="form-control"
															id="shipAddress2"
															placeholder="1234 Main St"
															required
														/>
														<div className="invalid-feedback">
															Please enter your shipping address.
														</div>
													</div>

													<div className="col-12">
														<label
															htmlFor="shipAddress2"
															className="form-label"
														>
															Address 2{" "}
															<span className="text-muted">(Optional)</span>
														</label>
														<input
															type="text"
															className="form-control"
															id="shipAddress2"
															placeholder="Apartment or suite"
														/>
													</div>

													<div className="col-md-5">
														<label
															htmlFor="shipCountry"
															className="form-label"
														>
															Country
														</label>
														<select
															className="form-select"
															id="shipCountry"
															required
														>
															<option value="">Choose...</option>
															<option>United States</option>
														</select>
														<div className="invalid-feedback">
															Please select a valid country.
														</div>
													</div>

													<div className="col-md-4">
														<label htmlFor="shipState" className="form-label">
															State
														</label>
														<select
															className="form-select"
															id="shipState"
															required
														>
															<option value="">Choose...</option>
															<option>Alabama</option>
															<option>Alaska</option>
															<option>Arizona</option>
															<option>Arkansas</option>
															<option>California</option>
															<option>Colorado</option>
															<option>Connecticut</option>
															<option>Delaware</option>
															<option>Florida</option>
															<option>Georgia</option>
															<option>Hawaii</option>
															<option>Idaho</option>
															<option>Illinois</option>
															<option>Indiana</option>
															<option>Iowa</option>
															<option>Kansas</option>
															<option>Kentucky</option>
															<option>Louisiana</option>
															<option>Maine</option>
															<option>Maryland</option>
															<option>Massachusetts</option>
															<option>Michigan</option>
															<option>Minnesota</option>
															<option>Mississippi</option>
															<option>Missouri</option>
															<option>Montana</option>
															<option>Nebraska</option>
															<option>Nevada</option>
															<option>New Hampshire</option>
															<option>New Jersey</option>
															<option>New Mexico</option>
															<option>New York</option>
															<option>North Carolina</option>
															<option>North Dakota</option>
															<option>Ohio</option>
															<option>Oklahoma</option>
															<option>Oregon</option>
															<option>Pennsylvania</option>
															<option>Rhode Island</option>
															<option>South Carolina</option>
															<option>South Dakota</option>
															<option>Tennessee</option>
															<option>Texas</option>
															<option>Utah</option>
															<option>Vermont</option>
															<option>Virginia</option>
															<option>Washington</option>
															<option>West Virginia</option>
															<option>Wisconsin</option>
															<option>Wyoming</option>
														</select>
														<div className="invalid-feedback">
															Please provide a valid state.
														</div>
													</div>

													<div className="col-md-3">
														<label htmlFor="shipState" className="form-label">
															Zip
														</label>
														<input
															type="text"
															className={`form-control`}
															id="shipZip"
															name="shipZip"
															required
															{...register("shipZip", {
																required: "Zip code is required",
																pattern: {
																	value: zipPattern,
																	message: "Invalid zip code",
																},
															})}
															placeholder=""
														/>
														{errors?.shipZip && (
															<div className="invalid-feedback">
																{errors?.shipZip.message}
															</div>
														)}
													</div>
												</div>
											</div>
										</>
									)}

									<hr className="my-4" />
									<h4 className="mb-3">Payment</h4>
									<div className="my-3">
										<div className="form-check">
											<input
												id="credit"
												name="paymentMethod"
												type="radio"
												className="form-check-input"
												checked
												required
											/>
											<label className="form-check-label" htmlFor="credit">
												Credit card
											</label>
										</div>
										<div className="form-check">
											<input
												id="debit"
												name="paymentMethod"
												type="radio"
												className="form-check-input"
												required
											/>
											<label className="form-check-label" htmlFor="debit">
												Debit card
											</label>
										</div>
									</div>

									<div className="row gy-3">
										<div className="col-md-6">
											<label htmlFor="cc-name" className="form-label">
												Name on card
											</label>
											<input
												type="text"
												className="form-control"
												id="ccName"
												placeholder=""
												required
											/>
											<small className="text-muted">
												Full name as displayed on card
											</small>
											<div className="invalid-feedback">
												Name on card is required
											</div>
										</div>

										<div className="col-md-6">
											<label htmlFor="ccNumber" className="form-label">
												Credit card number
											</label>
											<input
												type="text"
												className={`form-control ${
													errors?.ccNumber ? "is-invalid" : ""
												}`}
												id="ccNumber"
												name="ccNumber"
												required
												{...register("ccNumber", {
													required: "Credit card number is required",
													pattern: {
														value: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
														message: "Invalid credit card number",
													},
													minLength: 14,
													maxLength: 16
												})}
												placeholder=""
											/>
											{errors?.ccNumber && (
												<div className="invalid-feedback">
													{errors?.ccNumber.message}
												</div>
											)}
										</div>

										<div className="col-md-3">
											<label htmlFor="ccExpiration" className="form-label">
												Expiration
											</label>
											<input
												type="text"
												className="form-control"
												id="ccExpiration"
												placeholder="mm/yy"
												pattern="^(0[1-9]|1[0-2])\/\d{2}$"
												required
											/>
											<div className="invalid-feedback">
												Expiration date required
											</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="ccCvv" className="form-label">
												CVV
											</label>
											<input
												type="text"
												className={`form-control ${
													errors?.ccv ? "is-invalid" : ""
												}`}
												id="ccCvv"
												name="ccv"
												required
												{...register("ccv", {
													required: "CVV is required",
													pattern: {
														value: ccvPattern,
														message: "Invalid CVV",
													},
												})}
												placeholder=""
											/>
											{errors?.ccv && (
												<div className="invalid-feedback">
													{errors?.ccv.message}
												</div>
											)}
										</div>
									</div>

									<hr className="my-4" />

									<button
										className="w-100 btn btn-primary btn-lg"
										type="submit"
									>
										Continue to checkout
									</button>
								</form>
							</div>
						</div>
					</main>
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
					{/* <Navigate to={"/login"} /> */}
				</>
			)}

			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
};

export default Checkout;
