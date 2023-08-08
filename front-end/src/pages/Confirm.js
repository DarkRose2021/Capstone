import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Confirm = (props) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [orderID, setOrderID] = useState(null);
	const [cart, setCart] = useState(null);
	const [products, setProducts] = useState(null);
	const [user, setUser] = useState(null);
	let email = null;
	const location = useLocation();
	const { data } = location.state || {};

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

	function getCart() {
		let id = user._id;
		let url = `http://localhost:5000/cart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				// console.log(data[0])
				setCart(data[0]);
			})
			.catch((err) => console.log(err));
	}

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				// console.log(data);
				setUser(data.User);
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
		let getUrl = `http://localhost:5000/findProduct/${ids}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				// console.log(data);
				setProducts(data);
			})
			.catch((err) => console.log(err));
	}

	

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
			getProducts();
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
								{products?.map((product) => {
									<div>
										<span>{product.Name}</span>
										<span className="prices">{product.Price}</span>
									</div>
								})}
							</div>
							<hr />
							<div>
								<div className="total">total</div>
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
