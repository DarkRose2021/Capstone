import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductQty, calculatePrice, calculateTotal } from './CartUtils';

const Cart = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [cart, setCart] = useState(null);
	const [products, setProducts] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
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
				setCart(data[0])
			})
			.catch((err) => console.log(err));
	}

	function loadAPI() {
		let getUrl = `https://mane-frame-backend.onrender.com/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User)
				setLoading(false)
			})
			.catch((err) => console.log(err));
	}

	function getProducts() {
		if (cart && cart.Products) {
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
						setErrorMsg(
							"An error has occurred! Please come back later or contact us about the problem!"
						);
						console.log(err);
						setLoading(false);
					});
			} else {
				setProducts(null);
				setLoading(false);
			}
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
			if (cart.Products.length > 0) getProducts();
		}
	}, [cart]);

	function deleteItem(userId, id) {
		const getUrl = `https://mane-frame-backend.onrender.com/deleteCart/${userId}/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setCart(data.User);
				setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	}

	function updateQty(id, delta) {
		let oldQty = getProductQty(cart, id);
		let newQty = oldQty + delta;

		if (newQty == 0) {
			deleteItem(user._id, id);
		} else {
			const url = `https://mane-frame-backend.onrender.com/changeQty/${user._id}/${id}/${newQty}`;
			fetch(url)
				.then((r) => r.json())
				.then((data) => {
					getCart(user._id);
				})
				.catch((err) => console.log(err));
		}
	}

	return (
		<div className="container">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					{loading ? (
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
							{errorMsg ? (
								<div className="error">{errorMsg}</div>
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
																			Qty:{" "}
																			<span
																				onClick={() =>
																					updateQty(product._id, 1)
																				}
																			>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width="16"
																					height="16"
																					fill="currentColor"
																					className="bi bi-plus-lg"
																					viewBox="0 0 16 16"
																				>
																					<path
																						fillRule="evenodd"
																						d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
																					/>
																				</svg>{" "}
																			</span>
																			{getProductQty(cart, product._id)}{" "}
																			<span
																				onClick={() =>
																					updateQty(product._id, -1)
																				}
																			>
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width="16"
																					height="16"
																					fill="currentColor"
																					className="bi bi-dash-lg"
																					viewBox="0 0 16 16"
																				>
																					<path
																						fillRule="evenodd"
																						d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
																					/>
																				</svg>
																			</span>
																		</small>
																	</div>

																	<span className="prices">
																		$
																		{calculatePrice(
																			getProductQty(cart, product._id),
																			product.Price
																		)}
																	</span>
																	<svg
																		onClick={() =>
																			deleteItem(user._id, product._id)
																		}
																		xmlns="http://www.w3.org/2000/svg"
																		fill="#C41010"
																		width={"45"}
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
														<strong>${calculateTotal(cart, products)}</strong>
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
