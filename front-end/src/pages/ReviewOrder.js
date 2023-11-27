import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
	getProductQty,
	calculatePrice,
	calculateTotal,
	totalSalesTax,
} from "./CartUtils";

const ReviewOrder = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [orderID, setOrderID] = useState(null);
	const [tax, setTax] = useState(null);
	let email = null;
	const location = useLocation();
	const { data, products, cart } = location.state || {};

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

	useEffect(() => {
		const maxDisplayedLength = 15; // Set your desired maximum length here
		const uuid = uuidv4().substring(0, maxDisplayedLength);
		setOrderID(uuid);
	}, []);

	const getLastFourDigits = (cardNumber) => {
		// Check if cardNumber is valid and has at least 4 characters
		if (cardNumber && cardNumber.length >= 4) {
			return cardNumber.slice(-4); // Get the last 4 characters
		}
		return "****"; // Return default if card number is invalid
	};

	useEffect(() => {
		const url = `https://mane-frame-backend.onrender.com/tax/${data.state}`;
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setTax(data);
			})
			.catch((err) => console.log(err));
	}, [data]);

	let navigate = useNavigate();
    const routeChange = () => {
        let path = `/checkout`;
        navigate(path, {
            state: { data: data},
        });
    };

	const continueRoute = () => {
        let path = `/confirm`;
        navigate(path, {
            state: { data: data, products: products, cart: cart, tax: tax, id:orderID },
        });
    };

	return (
		<div className="review">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					{location.state ? (
						<>
							<h1>Review Order</h1>
							<div className="order-con">
								<div className="order">
									<div className="conProducts">
										<h3>Products</h3>
										<ul className="list-group list-group-flush mb-3 reviewCart">
											{cart ? (
												products?.map((product) => (
													<>
														<li
															key={product._id}
															className="list-group-item d-flex justify-content-between lh-sm"
														>
															<div>
																<h4 className="my-0">{product.Name}</h4>
																<small>{product.BriefDescription}</small>
																<br />
																<small>
																	Qty: {getProductQty(cart, product._id)}{" "}
																</small>
															</div>

															<span className="prices">
																$
																{calculatePrice(
																	getProductQty(cart, product._id),
																	product.Price
																)}
															</span>
														</li>
													</>
												))
											) : (
												<></>
											)}
										</ul>
										<hr className="lastProductHr" />
									</div>
									<div>
										<div className="total">
											Tax: ${totalSalesTax(cart, products, tax)} <br />
										</div>
										<div className="total">
											Total:{" "}
											<b>
												$
												{calculateTotal(cart, products) +
													totalSalesTax(cart, products, tax)}
											</b>
										</div>
									</div>
									<hr />
									<div className={`centerInfo ${data.shipAddress ? 'with-shipping' : 'without-shipping'}`}>
										<div className="billing">
										<h3>Billing Address</h3>
										<div>
											{data.firstName}{" "}
											{data.lastName}<br />
											{data.email}<br />
											{data.address} {" "}
											{data.address2 ? data.address2 : <></>}<br />
											{data.state}<br />
											{data.zip}<br />
											{data.country}<br />
										</div>
									</div>
									{data.shipAddress ? (<>
										<div className="shipping">
										<h3>Shipping Address</h3>
										<div>
											{data.shipFirstName}{" "}
											{data.shipLastName}<br />
											{data.shipAddress} {" "}
											{data.shipAddress2 ? data.shipAddress2 : <></>}<br />
											{data.shipState}<br />
											{data.shipZip}<br />
											{data.shipCountry}<br />
										</div>
									</div>
									</>) : (<></>)}
									<div className="cardInfo">
										<h3>Payment Info</h3>
										<div>
											{data.ccName}<br />
											**** **** {getLastFourDigits(data.ccNumber)}<br />
											{data.ccExpiration}<br />
										</div>
									</div>
								</div>
								<hr />
								<div className="centerBtn">
										<button onClick={() => {routeChange()}}>Go back to checkout</button>
										<button onClick={() => {continueRoute()}}>Confirm Order</button>
									
								</div>
							</div>
							</div>
						</>
					) : (
						// <Navigate to={"/checkout"} />
						<></>
					)}
				</>
			) : (
				<h1>You don't have permission to view this page</h1>
			)}
		</div>
	);
};

export default ReviewOrder;
