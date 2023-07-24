import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Checkout = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [sameAsBilling, setSameAsBilling] = useState(false);

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
				if (element.id === "cc-expiration") {
				  // Convert the date to "mm/yy" format before sending to the back end
				  const [month, year] = element.value.split("-");
				  data[element.id] = `${month}/${year.slice(2)}`;
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
					// Handle the response from the backend, e.g., show success message
					console.log("Response from backend:", responseData);
				})
				.catch((error) => {
					// Handle any errors that occurred during the fetch request
					console.error("Error posting form data:", error);
				});
		}

		form.classList.add("was-validated");
	};

	// add logic htmlFor shipping address to show or hide if the checkmark is clicked
	return (
		// add shipping address form
		<div className="container">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					<main>
						<div className="py-5 text-center">
							<h2>Checkout</h2>
						</div>

						<div className="row g-5 checkoutform">
							<div className="col-md-5 col-lg-4 order-md-last">
								<h4 className="d-flex justify-content-between align-items-center mb-3">
									<span className="">Your cart</span>
									<span className="badge bg-primary rounded-pill">3</span>
								</h4>
								<ul className="list-group mb-3">
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Product name</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$12</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Second product</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$8</span>
									</li>
									<li className="list-group-item d-flex justify-content-between lh-sm">
										<div>
											<h6 className="my-0">Third item</h6>
											<small className="text-muted">Brief description</small>
										</div>
										<span className="text-muted">$5</span>
									</li>
									<li className="list-group-item d-flex justify-content-between">
										<span>Total (USD)</span>
										<strong>$20</strong>
									</li>
								</ul>
							</div>
							<div className="col-md-7 col-lg-8">
								<h4 className="mb-3">Billing address</h4>
								<form className="needs-validation" noValidate onSubmit={handleFormSubmit}>
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
												placeholder="Last Name"
												required
											/>
											<div className="invalid-feedback">
												Valid last name is required.
											</div>
										</div>

										<div className="col-12">
											<label htmlFor="email" className="form-label">
												Email <span className="text-muted">(Optional)</span>
											</label>
											<input
												type="email"
												className="form-control"
												id="email"
												placeholder="you@example.com"
											/>
											<div className="invalid-feedback">
												Please enter a valid email address htmlFor shipping
												updates.
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
												type="number"
												className="form-control"
												id="zip"
												placeholder=""
												required
											/>
											<div className="invalid-feedback">Zip code required.</div>
										</div>
									</div>

									<hr className="my-4" />

									<div className="form-check">
										<input
											type="checkbox"
											className="form-check-input"
											id="same-address"
											checked={sameAsBilling}
											onChange={handleCheckboxChange}
										/>
										<label className="form-check-label" htmlFor="same-address">
											Shipping address is the same as my billing address
										</label>
									</div>
									<hr className="my-4" />

									{sameAsBilling ? (
										<></>
									) : (
										// Render the editable billing address fields if sameAsBilling is false

										<>
											<div className="form-check">
												<h4 className="mb-3">Shipping address</h4>
												<div className="row g-3">
													<div className="col-sm-6">
														<label htmlFor="ship_FfirstName" className="form-label">
															First name
														</label>
														<input
															type="text"
															className="form-control"
															id="ship_firstName"
															placeholder="First Name"
															required
														/>
														<div className="invalid-feedback">
															Valid first name is required.
														</div>
													</div>

													<div className="col-sm-6">
														<label htmlFor="ship_lastName" className="form-label">
															Last name
														</label>
														<input
															type="text"
															className="form-control"
															id="ship_lastName"
															placeholder="Last Name"
															required
														/>
														<div className="invalid-feedback">
															Valid last name is required.
														</div>
													</div>

													<div className="col-12">
														<label htmlFor="ship_email" className="form-label">
															Email{" "}
															<span className="text-muted">(Optional)</span>
														</label>
														<input
															type="email"
															className="form-control"
															id="ship_email"
															placeholder="you@example.com"
														/>
														<div className="invalid-feedback">
															Please enter a valid email address htmlFor
															shipping updates.
														</div>
													</div>

													<div className="col-12">
														<label htmlFor="ship_address" className="form-label">
															Address
														</label>
														<input
															type="text"
															className="form-control"
															id="ship_address"
															placeholder="1234 Main St"
															required
														/>
														<div className="invalid-feedback">
															Please enter your shipping address.
														</div>
													</div>

													<div className="col-12">
														<label htmlFor="ship_address2" className="form-label">
															Address 2{" "}
															<span className="text-muted">(Optional)</span>
														</label>
														<input
															type="text"
															className="form-control"
															id="ship_address2"
															placeholder="Apartment or suite"
														/>
													</div>

													<div className="col-md-5">
														<label htmlFor="ship_country" className="form-label">
															Country
														</label>
														<select
															className="form-select"
															id="ship_country"
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
														<label htmlFor="ship_state" className="form-label">
															State
														</label>
														<select className="form-select" id="ship_state" required>
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
														<label htmlFor="ship_zip" className="form-label">
															Zip
														</label>
														<input
															type="number"
															className="form-control"
															id="ship_zip"
															placeholder=""
															required
														/>
														<div className="invalid-feedback">
															Zip code required.
														</div>
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
												id="cc-name"
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
											<label htmlFor="cc-number" className="form-label">
												Credit card number
											</label>
											<input
												type="number"
												className="form-control"
												id="cc-number"
												placeholder=""
												required
											/>
											<div className="invalid-feedback">
												Credit card number is required
											</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="cc-expiration" className="form-label">
												Expiration
											</label>
											<input
												type="text"
												className="form-control"
												id="cc-expiration"
												placeholder="mm/yy"
												pattern="^(0[1-9]|1[0-2])\/\d{2}$"
												required
											/>
											<div className="invalid-feedback">
												Expiration date required
											</div>
										</div>

										<div className="col-md-3">
											<label htmlFor="cc-cvv" className="form-label">
												CVV
											</label>
											<input
												type="number"
												className="form-control"
												id="cc-cvv"
												placeholder=""
												required
											/>
											<div className="invalid-feedback">
												Security code required
											</div>
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
