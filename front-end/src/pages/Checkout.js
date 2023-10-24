import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

const Checkout = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [sameAsBilling, setSameAsBilling] = useState(false);
	const [loading, setLoading] = useState(true);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		criteriaMode: "all",
	});
	const [showPopup, setShowPopup] = useState(false);
	const [sendData, setSendData] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [cart, setCart] = useState(null);
	const [products, setProducts] = useState(null);
	const [user, setUser] = useState(null);
	const [tax, setTax] = useState(null);
	let email = null;

	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/confirm`;
		navigate(path, {
			state: { data: sendData, products: products, cart: cart, tax: tax },
		});
	};

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

	const handleClosePopup = () => {
		setShowPopup(false);
		localStorage.setItem("popupShown", "true");
		routeChange();
	};

	const cardNumberPattern = /^[0-9]{4}[0-9]{4}[0-9]{4}$/;
	const ccvPattern = /^\d{3,4}$/;
	const zipPattern = /^\d{5}$/;
	const namePattern = /^[A-Za-z\s]+$/;
	const validateName = (value) => {
		if (namePattern.test(value)) {
			return true;
		}
		return "Name must only contain letters";
	};

	function getCart() {
		let id = user._id;
		let url = `https://mane-frame-backend.onrender.com/cart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setCart(data[0]);
			})
			.catch((err) => console.log(err));
	}

	function loadAPI() {
		let getUrl = `https://mane-frame-backend.onrender.com/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User);
				setLoading(false); // Set loading to false when the data is received
			})
			.catch((err) => console.log(err));
	}

	function getProducts() {
		let ids = [];
		const productsArray = cart.Products;

		// Loop through the Products array and extract ProductID values
		for (const product of productsArray) {
			const productId = product.ProductID;
			ids.push(productId);
		}

		if (ids.length > 0) {
			let getUrl = `https://mane-frame-backend.onrender.com/findProduct/${ids}`;
			fetch(getUrl)
				.then((data) => data.json())
				.then((data) => {
					setProducts(data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			setProducts(null);
			setLoading(false);
		}
	}

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0) {
				setLoggedIn(true);
				setRoles(localStorage.getItem("Roles"));
				email = localStorage.getItem("Valid Email");
			}
		};

		window.addEventListener("storage", handleStorage());
		return () => window.removeEventListener("storage", handleStorage());
	}, []);

	const handleCheckboxChange = (event) => {
		setSameAsBilling(event.target.checked);
	};

	//rework the entire submit?
	const onSubmit = (data) => {
		data.date = formattedDate;
		const endpoint = `https://mane-frame-backend.onrender.com/checkout`;

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
				setSendData(responseData.Body);
				setTax(responseData.Tax);
				setShowPopup(true);

				emailjs
					.send(
						"service_iua6vej",
						"template_kw5pkjq",
						{
							to_email: "kking@student.neumont.edu",
							from_email: "maneframephotography2023@gmail.com",
							from_name: "Mane Frame",
							subject: "Confirmation Email",
							message: `
									Hi ${data.firstName} ${data.lastName} \n
									Your order has been confirmed! \n
									Date placed: ${formattedDate} \n
									Shipping to: ${data.shipAddress ? data.shipAddress : data.address}\n
									Thank you for your order! \n
									-Mane Frame Photography
								`,
						},
						"jhFwa0eEmp0_7VOPv"
					)
					.then(
						function (response) {
							console.log("Email sent successfully!", response);
						},
						function (error) {
							console.error("Email failed to send.", error);
						}
					);
			})
			.catch((error) => {
				// Handle any errors that occurred during the fetch request
				console.error("Error posting form data:", error);
			});
	};

	useEffect(() => {
		loadAPI();
	}, [email]);

	useEffect(() => {
		if (user) {
			getCart();
		}
	}, [user]);

	useEffect(() => {
		if (cart) {
			if (cart.Products.length > 0) getProducts();
		}
	}, [cart]);

	function getProductQty(productId) {
		if (cart) {
			const productInCart = cart.Products.find(
				(product) => product.ProductID === productId
			);
			return productInCart ? productInCart.Qty : 0;
		}
		return 0;
	}

	function prices(qty, price) {
		return qty * price;
	}

	function total() {
		let total = 0;
		if (cart && products) {
			products.forEach((product) => {
				const quantity = getProductQty(product._id);
				total += prices(quantity, product.Price);
			});
		}
		return total;
	}

	const calculateTotalItems = () => {
		let totalItems = 0;
		if (cart && products) {
			products.forEach((product) => {
				totalItems += getProductQty(product._id);
			});
		}
		return totalItems;
	};

	function deleteItem(userId, id) {
		const getUrl = `https://mane-frame-backend.onrender.com/deleteCart/${userId}/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setCart(data.User);
				// setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="container moveItOver">
			{showPopup && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p>
								Form Submitted! This information will not be saved, you will not
								actually receive a product, and your card won't actually be
								charged.
							</p>
							<button className="close-button" onClick={handleClosePopup}>
								I understand!
							</button>
						</div>
					</div>
				</>
			)}
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
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
							{cart?.Products.length > 0 ? (
								<>
									<main>
										<div className="py-5 text-center">
											<h1>Checkout</h1>
										</div>

										<div className="row g-5 checkoutform">
											<div className="col-md-5 col-lg-4 order-md-last ">
												<h4 className="d-flex justify-content-between align-items-center mb-3">
													<span className="">Your cart</span>
													<span className="badge bg-primary rounded-pill">
														{calculateTotalItems()}
													</span>
												</h4>
												<ul className="list-group mb-3 cart">
													{cart ? (
														products?.map((product) => (
															<>
																<li
																	key={product.Name}
																	className="list-group-item d-flex justify-content-between lh-sm"
																>
																	<div>
																		<h4 className="my-0">{product.Name}</h4>
																		<small>{product.BriefDescription}</small>
																		<br />
																		<small>
																			Qty: {getProductQty(product._id)}
																		</small>
																	</div>

																	<span className="prices">
																		$
																		{prices(
																			getProductQty(product._id),
																			product.Price
																		)}
																	</span>
																	<svg
																		onClick={() =>
																			deleteItem(cart.UserID, product._id)
																		}
																		xmlns="http://www.w3.org/2000/svg"
																		fill="#C41010"
																		width={"150"}
																		className="bi bi-cart-x-fill"
																		viewBox="0 0 16 16"
																	>
																		<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
																	</svg>
																</li>
															</>
														))
													) : (
														<></>
													)}
													<li className="list-group-item d-flex justify-content-between total">
														<span>Total (USD)</span>
														<strong>${total()}</strong>
													</li>
												</ul>
											</div>
											<div className="col-md-7 col-lg-8">
												<h4 className="mb-3">Billing address</h4>
												<form onSubmit={handleSubmit(onSubmit)}>
													<div className="row g-3">
														<div className="col-sm-6">
															<label htmlFor="firstName" className="form-label">
																First name <span className="required">*</span>
															</label>
															<input
																type="text"
																className={`form-control ${
																	errors?.firstName ? "is-invalid" : ""
																}`}
																id="firstName"
																placeholder="First Name"
																{...register("firstName", {
																	required: "Name is required",
																	validate: validateName,
																	minLength: {
																		value: 2,
																		message:
																			"Name can't be shorter than 2 characters",
																	},
																	maxLength: {
																		value: 100,
																		message:
																			"Name cannot exceed 100 characters",
																	},
																})}
															/>

															{errors?.firstName && (
																<div className="invalid-feedback lightError">
																	{errors?.firstName.message}
																</div>
															)}
														</div>

														<div className="col-sm-6">
															<label htmlFor="lastName" className="form-label">
																Last name <span className="required">*</span>
															</label>
															<input
																type="text"
																className={`form-control ${
																	errors?.lastName ? "is-invalid" : ""
																}`}
																id="lastName"
																placeholder="Last Name"
																{...register("lastName", {
																	required: "Name is required",
																	validate: validateName,
																	minLength: {
																		value: 2,
																		message:
																			"Name can't be shorter than 2 characters",
																	},
																	maxLength: {
																		value: 100,
																		message:
																			"Name cannot exceed 100 characters",
																	},
																})}
															/>
															{errors?.lastName && (
																<div className="invalid-feedback lightError">
																	{errors?.lastName.message}
																</div>
															)}
														</div>

														<div className="col-12">
															<label htmlFor="email" className="form-label">
																Email <span className="required">*</span>
															</label>
															<input
																type="email"
																className={`form-control ${
																	errors?.email ? "is-invalid" : ""
																}`}
																id="email"
																placeholder="you@example.com"
																{...register("email", {
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
															{errors?.email && (
																<div className="invalid-feedback lightError">
																	{errors?.email.message}
																</div>
															)}
														</div>

														<div className="col-12">
															<label htmlFor="address" className="form-label">
																Address <span className="required">*</span>
															</label>
															<input
																type="text"
																className={`form-control ${
																	errors?.address ? "is-invalid" : ""
																}`}
																id="address"
																placeholder="1234 Main St"
																{...register("address", {
																	required: "You must enter an address",
																})}
															/>
															{errors?.address && (
																<div className="invalid-feedback lightError">
																	{errors?.address.message}
																</div>
															)}
														</div>

														<div className="col-12">
															<label htmlFor="address2" className="form-label">
																Address 2{" "}
																<span className="text-muted">(Optional)</span>
															</label>
															<input
																type="text"
																name="address2"
																className={`form-control ${
																	errors?.address2 ? "is-invalid" : ""
																}`}
																id="address2"
																placeholder="Apartment or suite"
																{...register("address2")}
															/>
														</div>

														<div className="col-md-5">
															<label htmlFor="country" className="form-label">
																Country <span className="required">*</span>
															</label>
															<select
																className={`form-select ${
																	errors?.country ? "is-invalid" : ""
																}`}
																id="country"
																defaultValue={""}
																{...register("country", {
																	required: "You must choose a country",
																})}
															>
																<option disabled value="">
																	Choose...
																</option>
																<option value={"United States"}>
																	United States
																</option>
															</select>
															{errors?.country && (
																<div className="invalid-feedback lightError">
																	{errors?.country.message}
																</div>
															)}
														</div>

														<div className="col-md-4">
															<label htmlFor="state" className="form-label">
																State <span className="required">*</span>
															</label>
															<select
																className={`form-select ${
																	errors?.state ? "is-invalid" : ""
																}`}
																id="state"
																defaultValue={""}
																{...register("state", {
																	required: "You must choose a state",
																})}
															>
																<option value="" disabled>
																	Choose...
																</option>
																<option value="Alabama">Alabama</option>
																<option value="Alaska">Alaska</option>
																<option value="Arizona">Arizona</option>
																<option value="Arkansas">Arkansas</option>
																<option value="California">California</option>
																<option value="Colorado">Colorado</option>
																<option value="Connecticut">Connecticut</option>
																<option value="Delaware">Delaware</option>
																<option value="Florida">Florida</option>
																<option value="Georgia">Georgia</option>
																<option value="Hawaii">Hawaii</option>
																<option value="Idaho">Idaho</option>
																<option value="Illinois">Illinois</option>
																<option value="Indiana">Indiana</option>
																<option value="Iowa">Iowa</option>
																<option value="Kansas">Kansas</option>
																<option value="Kentucky">Kentucky</option>
																<option value="Louisiana">Louisiana</option>
																<option value="Maine">Maine</option>
																<option value="Maryland">Maryland</option>
																<option value="Massachusetts">
																	Massachusetts
																</option>
																<option value="Michigan">Michigan</option>
																<option value="Minnesota">Minnesota</option>
																<option value="Mississippi">Mississippi</option>
																<option value="Missouri">Missouri</option>
																<option value="Montana">Montana</option>
																<option value="Nebraska">Nebraska</option>
																<option value="Nevada">Nevada</option>
																<option value="New Hampshire">
																	New Hampshire
																</option>
																<option value="New Jersey">New Jersey</option>
																<option value="New Mexico">New Mexico</option>
																<option value="New York">New York</option>
																<option value="North Carolina">
																	North Carolina
																</option>
																<option value="North Dakota">
																	North Dakota
																</option>
																<option value="Ohio">Ohio</option>
																<option value="Oklahoma">Oklahoma</option>
																<option value="Oregon">Oregon</option>
																<option value="Pennsylvania">
																	Pennsylvania
																</option>
																<option value="Rhode Island">
																	Rhode Island
																</option>
																<option value="South Carolina">
																	South Carolina
																</option>
																<option value="South Dakota">
																	South Dakota
																</option>
																<option value="Tennessee">Tennessee</option>
																<option value="Texas">Texas</option>
																<option value="Utah">Utah</option>
																<option value="Vermont">Vermont</option>
																<option value="Virginia">Virginia</option>
																<option value="Washington">Washington</option>
																<option value="West Virginia">
																	West Virginia
																</option>
																<option value="Wisconsin">Wisconsin</option>
																<option value="Wyoming">Wyoming</option>
															</select>
															{errors?.state && (
																<div className="invalid-feedback lightError">
																	{errors?.state.message}
																</div>
															)}
														</div>

														<div className="col-md-3">
															<label htmlFor="zip" className="form-label">
																Zip <span className="required">*</span>
															</label>
															<input
																type="number"
																className={`form-control ${
																	errors?.zip ? "is-invalid" : ""
																}`}
																id="zip"
																name="zip"
																{...register("zip", {
																	required: "Zip code is required",
																	pattern: {
																		value: zipPattern,
																		message: "Invalid zip code",
																	},
																})}
																placeholder="ZipCode"
															/>
															{errors?.zip && (
																<div className="invalid-feedback lightError">
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
														<label
															className="form-check-label"
															htmlFor="sameAddress"
														>
															Shipping address is the same as my billing address
														</label>
													</div>

													{sameAsBilling ? (
														<></>
													) : (
														// Render the editable billing address fields if sameAsBilling is false

														<>
															<hr className="my-4" />
															{/* <div className="form-check"> */}
															<h4 className="mb-3">Shipping address</h4>
															<div className="row g-3">
																<div className="col-sm-6">
																	<label
																		htmlFor="shipFirstName"
																		className="form-label"
																	>
																		First name{" "}
																		<span className="required">*</span>
																	</label>
																	<input
																		type="text"
																		className={`form-control ${
																			errors?.shipFirstName ? "is-invalid" : ""
																		}`}
																		id="shipFirstName"
																		placeholder="First Name"
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
																				message:
																					"Name cannot exceed 100 characters",
																			},
																		})}
																	/>
																	{errors?.shipFirstName && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipFirstName.message}
																		</div>
																	)}
																</div>

																<div className="col-sm-6">
																	<label
																		htmlFor="shipLastName"
																		className="form-label"
																	>
																		Last name{" "}
																		<span className="required">*</span>
																	</label>
																	<input
																		type="text"
																		className={`form-control ${
																			errors?.shipLastName ? "is-invalid" : ""
																		}`}
																		id="shipLastName"
																		placeholder="Last Name"
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
																				message:
																					"Name cannot exceed 100 characters",
																			},
																		})}
																	/>

																	{errors?.shipLastName && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipLastName.message}
																		</div>
																	)}
																</div>

																<div className="col-12">
																	<label
																		htmlFor="shipAddress"
																		className="form-label"
																	>
																		Address <span className="required">*</span>
																	</label>
																	<input
																		name="shipAddress"
																		type="text"
																		className={`form-control ${
																			errors?.shipAddress ? "is-invalid" : ""
																		}`}
																		id="shipAddress"
																		placeholder="1234 Main St"
																		{...register("shipAddress", {
																			required:
																				"You must add a shipping address",
																		})}
																	/>
																	{errors?.shipAddress && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipAddress.message}
																		</div>
																	)}
																</div>

																<div className="col-12">
																	<label
																		htmlFor="shipAddress2"
																		className="form-label"
																	>
																		Address 2{" "}
																		<span className="text-muted">
																			(Optional)
																		</span>
																	</label>
																	<input
																		type="text"
																		name="shipAddress2"
																		className="form-control"
																		id="shipAddress2"
																		placeholder="Apartment or suite"
																		{...register("shipAddress2")}
																	/>
																</div>

																<div className="col-md-5">
																	<label
																		htmlFor="shipCountry"
																		className="form-label"
																	>
																		Country <span className="required">*</span>
																	</label>
																	<select
																		name="shipCountry"
																		className={`form-select ${
																			errors?.shipCountry ? "is-invalid" : ""
																		}`}
																		id="shipCountry"
																		defaultValue={""}
																		{...register("shipCountry", {
																			required: "You must choose a country",
																		})}
																	>
																		<option value="" disabled>
																			Choose...
																		</option>
																		<option value={"United States"}>
																			United States
																		</option>
																	</select>
																	{errors?.shipCountry && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipCountry.message}
																		</div>
																	)}
																</div>

																<div className="col-md-4">
																	<label
																		htmlFor="shipState"
																		className="form-label"
																	>
																		State <span className="required">*</span>
																	</label>
																	<select
																		defaultValue={""}
																		name="shipState"
																		className={`form-select ${
																			errors?.shipState ? "is-invalid" : ""
																		}`}
																		id="shipState"
																		{...register("shipState", {
																			required: "You must select a state",
																		})}
																	>
																		<option value="" disabled>
																			Choose...
																		</option>
																		<option value="Alabama">Alabama</option>
																		<option value="Alaska">Alaska</option>
																		<option value="Arizona">Arizona</option>
																		<option value="Arkansas">Arkansas</option>
																		<option value="California">
																			California
																		</option>
																		<option value="Colorado">Colorado</option>
																		<option value="Connecticut">
																			Connecticut
																		</option>
																		<option value="Delaware">Delaware</option>
																		<option value="Florida">Florida</option>
																		<option value="Georgia">Georgia</option>
																		<option value="Hawaii">Hawaii</option>
																		<option value="Idaho">Idaho</option>
																		<option value="Illinois">Illinois</option>
																		<option value="Indiana">Indiana</option>
																		<option value="Iowa">Iowa</option>
																		<option value="Kansas">Kansas</option>
																		<option value="Kentucky">Kentucky</option>
																		<option value="Louisiana">Louisiana</option>
																		<option value="Maine">Maine</option>
																		<option value="Maryland">Maryland</option>
																		<option value="Massachusetts">
																			Massachusetts
																		</option>
																		<option value="Michigan">Michigan</option>
																		<option value="Minnesota">Minnesota</option>
																		<option value="Mississippi">
																			Mississippi
																		</option>
																		<option value="Missouri">Missouri</option>
																		<option value="Montana">Montana</option>
																		<option value="Nebraska">Nebraska</option>
																		<option value="Nevada">Nevada</option>
																		<option value="New Hampshire">
																			New Hampshire
																		</option>
																		<option value="New Jersey">
																			New Jersey
																		</option>
																		<option value="New Mexico">
																			New Mexico
																		</option>
																		<option value="New York">New York</option>
																		<option value="North Carolina">
																			North Carolina
																		</option>
																		<option value="North Dakota">
																			North Dakota
																		</option>
																		<option value="Ohio">Ohio</option>
																		<option value="Oklahoma">Oklahoma</option>
																		<option value="Oregon">Oregon</option>
																		<option value="Pennsylvania">
																			Pennsylvania
																		</option>
																		<option value="Rhode Island">
																			Rhode Island
																		</option>
																		<option value="South Carolina">
																			South Carolina
																		</option>
																		<option value="South Dakota">
																			South Dakota
																		</option>
																		<option value="Tennessee">Tennessee</option>
																		<option value="Texas">Texas</option>
																		<option value="Utah">Utah</option>
																		<option value="Vermont">Vermont</option>
																		<option value="Virginia">Virginia</option>
																		<option value="Washington">
																			Washington
																		</option>
																		<option value="West Virginia">
																			West Virginia
																		</option>
																		<option value="Wisconsin">Wisconsin</option>
																		<option value="Wyoming">Wyoming</option>
																	</select>
																	{errors?.shipState && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipState.message}
																		</div>
																	)}
																</div>

																<div className="col-md-3">
																	<label
																		htmlFor="shipState"
																		className="form-label"
																	>
																		Zip <span className="required">*</span>
																	</label>
																	<input
																		type="number"
																		className={`form-control ${
																			errors?.shipZip ? "is-invalid" : ""
																		}`}
																		id="shipZip"
																		name="shipZip"
																		placeholder="ZipCode"
																		{...register("shipZip", {
																			required: "Zip code is required",
																			pattern: {
																				value: zipPattern,
																				message: "Invalid zip code",
																			},
																		})}
																	/>
																	{errors?.shipZip && (
																		<div className="invalid-feedback lightError">
																			{errors?.shipZip.message}
																		</div>
																	)}
																</div>
															</div>
															{/* </div> */}
														</>
													)}

													<hr className="my-4" />
													<h4 className="mb-3">Payment</h4>

													<div className="row gy-3">
														<div className="col-md-6">
															<label htmlFor="ccName" className="form-label">
																Name on card <span className="required">*</span>
															</label>
															<input
																type="text"
																name="ccName"
																className={`form-control ${
																	errors?.ccName ? "is-invalid" : ""
																}`}
																id="ccName"
																placeholder="Full name as displayed on card"
																{...register("ccName", {
																	required: {
																		value: true,
																		message:
																			"You must enter the name on the card",
																	},
																	validate: validateName,
																	minLength: {
																		value: 2,
																		message:
																			"Name can't be shorter than 2 characters",
																	},
																	maxLength: {
																		value: 100,
																		message:
																			"Name can't be over 100 characters",
																	},
																})}
															/>
															<small className="text-muted">
																Full name as displayed on card
															</small>
															{errors?.ccName && (
																<div className="invalid-feedback lightError">
																	{errors?.ccName.message}
																</div>
															)}
														</div>

														<div className="col-md-6">
															<label htmlFor="ccNumber" className="form-label">
																Card number <span className="required">*</span>
															</label>
															<input
																type="number"
																className={`form-control ${
																	errors?.ccNumber ? "is-invalid" : ""
																}`}
																id="ccNumber"
																name="ccNumber"
																{...register("ccNumber", {
																	required: "Card number is required",
																	pattern: {
																		value: cardNumberPattern,
																		message: "Invalid card number",
																	},
																	minLength: {
																		value: 12,
																		message:
																			"Card number must be at least 12 digits long",
																	},
																	maxLength: {
																		value: 12,
																		message:
																			"Card number can't be longer that 12 digits",
																	},
																})}
																placeholder="Card Number"
															/>
															{errors?.ccNumber && (
																<div className="invalid-feedback lightError">
																	{errors?.ccNumber.message}
																</div>
															)}
														</div>

														<div className="col-md-3">
															<label
																htmlFor="ccExpiration"
																className="form-label"
															>
																Expiration <span className="required">*</span>
															</label>
															<input
																type="text"
																className={`form-control ${
																	errors?.ccExpiration ? "is-invalid" : ""
																}`}
																id="ccExpiration"
																placeholder="mm/yy"
																{...register("ccExpiration", {
																	required:
																		"You must enter the expiration date",
																	validate: /^(0[1-9]|1[0-2])\/\d{2}$/,
																	minLength: 5,
																	maxLength: 5,
																})}
															/>
															{errors?.ccExpiration && (
																<div className="invalid-feedback lightError">
																	{errors?.ccExpiration.message}
																</div>
															)}
														</div>

														<div className="col-md-3">
															<label htmlFor="ccCvv" className="form-label">
																CVV <span className="required">*</span>
															</label>
															<input
																type="number"
																className={`form-control ${
																	errors?.ccv ? "is-invalid" : ""
																}`}
																id="ccCvv"
																name="ccv"
																{...register("ccv", {
																	required: "CVV is required",
																	pattern: {
																		value: ccvPattern,
																		message: "Invalid CVV",
																	},
																	minLength: {
																		value: 3,
																		message: "CCV must be 3 digits long",
																	},
																	maxLength: {
																		value: 3,
																		message:
																			"CCV can't be more than 3 digits long",
																	},
																})}
																placeholder="CVV"
															/>
															{errors?.ccv && (
																<div className="invalid-feedback lightError">
																	{errors?.ccv.message}
																</div>
															)}
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
									<h1>There's nothing in your cart!</h1>
								</>
							)}
						</>
					)}
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
