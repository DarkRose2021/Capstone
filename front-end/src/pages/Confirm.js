import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Confirm = (props) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [orderID, setOrderID] = useState(null);
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
		// Function to update the date every second (optional)
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 3600000);

		// Clean up the interval when the component unmounts
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const maxDisplayedLength = 15; // Set your desired maximum length here
		const uuid = uuidv4().substring(0, maxDisplayedLength);
		setOrderID(uuid);
	}, [data]);

	const formattedDate = currentDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const getLastFourDigits = (cardNumber) => {
		// Check if cardNumber is valid and has at least 4 characters
		if (cardNumber && cardNumber.length >= 4) {
			return cardNumber.slice(-4); // Get the last 4 characters
		}
		return "****"; // Return default if card number is invalid
	};

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

	useEffect(() =>{
		let id = cart.UserID
		let url = `http://localhost:5000/clearCart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {})
			.catch((err) => console.log(err));
	}, [data])

	return (
		<div>
			{roles?.includes("Admin") || roles?.includes("Client")  ? (
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
									<p>{formattedDate}</p>
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
										<span>{product.Name}</span>
										<span className="prices">${product.Price}</span>
									</div></>
								))}
							</div>
							<hr />
							<div>
								<div className="total">Total: <b>${total()}</b></div>
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
