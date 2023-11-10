import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getProductQty, calculatePrice, calculateTotal, totalSalesTax  } from './CartUtils';

const Confirm = (props) => {
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
	}, [data]);

	const getLastFourDigits = (cardNumber) => {
		// Check if cardNumber is valid and has at least 4 characters
		if (cardNumber && cardNumber.length >= 4) {
			return cardNumber.slice(-4); // Get the last 4 characters
		}
		return "****"; // Return default if card number is invalid
	};

	useEffect(() => {
		const url = `http://localhost:5000/tax/${data.state}`;
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setTax(data);
			})
			.catch((err) => console.log(err));
	}, [data]);

	

	useEffect(() => {
		let id = cart._id;
		let url = `http://localhost:5000/clearCart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {})
			.catch((err) => console.log(err));
	}, [data]);

	return (
		<div>
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					<h1>Your Order has been confirmed!</h1>
					<div className="order-con">
						<div className="order">
							<h3>Hi {data.firstName}!</h3>
							<p>Your order has been confirmed and will be shipped soon</p>
							<hr />
							<div className="orderInfo">
								<div>
									<h4>Order date</h4>
									<p>{data.date}</p>
								</div>
								<div>
									<h4>Order ID</h4>
									<p>{orderID}</p>
								</div>
								<div>
									<h4>Payment</h4>
									<p>**** **** **** {getLastFourDigits(data.ccNumber)}</p>
								</div>
								<div>
									<h4>Address</h4>
									<p>{data.address}</p>
								</div>
							</div>
							<hr />
							<div className="conProducts">
								{products?.map((product) => (
									<>
										<div key={product._id}>
											<div>
												{product.Name}
												<span className="prices">
													${calculatePrice(getProductQty(cart, product._id), product.Price)}
												</span>
												<br />
												<span className="qty text-muted">
													Qty: {getProductQty(cart, product._id)}
												</span>
											</div>
										</div>
										<br />
										<hr className="productDivide" />
									</>
								))}
							</div>

							<div>
								<div className="total">
									Tax: ${totalSalesTax(cart, products, tax)} <br />
								</div>
								<div className="total">
									Total: <b>${calculateTotal(cart, products) + totalSalesTax(cart, products, tax)}</b>
								</div>
							</div>
							<hr />
							<div>
								We'll send you a shipping confirmation when your order ships!
								Thank you for your purchase!
								<br />
								<b>Thank You!</b>
								<br />
								Mane Frame Photography
							</div>
						</div>
					</div>
					<br />
					<br />
					<br />
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
					{/* <Navigate to={"/login"} /> */}
				</>
			)}
		</div>
	);
};

export default Confirm;
