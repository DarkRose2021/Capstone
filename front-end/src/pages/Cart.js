import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Products from "./Products";

const Cart = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [cart, setCart] = useState(null);
	const [products, setProducts] = useState(null);
	const [user, setUser] = useState(null);
	const [msg, setMsg] = useState(null);
	const [loading, setLoading] = useState(true);
	let email = null;

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
		let url = `https://mane-frame-backend.onrender.com/cart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				// console.log(data);
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
			})
			.catch((err) => console.log(err));
	}

	function getProducts() {
		if (cart && cart.Products) {
			const ids = cart.Products.map((product) => product.ProductID);
			let getUrl = `https://mane-frame-backend.onrender.com/findProduct/${ids}`;
			fetch(getUrl)
				.then((data) => data.json())
				.then((data) => {
					setProducts(data);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}

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
		if (cart && cart.Products) {
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

	function deleteItem(userId, id) {
		const getUrl = `https://mane-frame-backend.onrender.com/deleteCart/${userId}/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setCart(data.User);
				setMsg(data.Message);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="container">
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
							{cart && products ? (
								<>
									<br />
									<main>
										<div className="row g-5 ">
											<div>
												<h1 className="mb-3 cartPg">Your cart</h1>
												{msg ? <h2>{msg}</h2> : <></>}
												<ul className="list-group mb-3 cart">
													{cart ? (
														products?.map((product) => (
															<li
																key={product.Name}
																className="list-group-item d-flex justify-content-between lh-sm"
															>
																<div>
																	<h4 className="my-0">{product.Name}</h4>
																	<small>{product.BriefDescription}</small>
																	<br />
																	{/* {cart.product.ProductID} */}
																	{/* add something to decease the qty */}
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
																{/* delete item no matter the qty*/}
																<svg
																	onClick={() =>
																		deleteItem(cart.UserID, product._id)
																	}
																	xmlns="http://www.w3.org/2000/svg"
																	width={"35"}
																	fill="#C41010"
																	className="bi bi-cart-x-fill"
																	viewBox="0 0 16 16"
																>
																	<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
																</svg>
															</li>
														))
													) : (
														<></>
													)}
													<li className="list-group-item d-flex justify-content-between">
														<h4>Total (USD)</h4>
														<strong className="prices">${total()}</strong>
													</li>
												</ul>
												<div className="checkoutBtn">
													<Link to={"/checkout"} className="btn">
														<button>Proceed to Checkout</button>
													</Link>
												</div>
											</div>
										</div>
									</main>
								</>
							) : (
								<>
									<h1>Your Cart is empty!</h1>
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
		</div>
	);
};

export default Cart;
