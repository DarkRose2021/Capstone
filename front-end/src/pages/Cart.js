import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Products from "./Products";

const Cart = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [cart, setCart] = useState(null);
	const [products, setProducts] = useState(null);
	const [user, setUser] = useState(null);
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
		let url = `http://localhost:5000/cart/${id}`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setCart(data[0]);
			})
			.catch((err) => console.log(err));
	}

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
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
				setProducts(data);
			})
			.catch((err) => console.log(err));
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

	function deleteItem(userId, id){
		const getUrl = `http://localhost:5000/deleteCart/${userId}/${id}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				// setCart(data.Users);
				// setMsg(data.Message);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="container">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					{cart && products ? (
						<>
							<br />
							<main>
								<div className="row g-5 ">
									<div>
										<h1 className="mb-3 cartPg">Your cart</h1>
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
																{cart.Products.ProductID}
																<small>Qty: {getProductQty(product._id)}</small>
															</div>

															<span className="prices">
																$
																{prices(
																	getProductQty(product._id),
																	product.Price
																)}
																
															</span>
															{/* <svg  onClick={() =>deleteItem(cart.UserID, product._id)}xmlns="http://www.w3.org/2000/svg" width="35" fill="#C41010" className="bi bi-cart-x-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
</svg> */}
														</li>
													</>
												))
											) : (
												<></>
											)}
											<li className="list-group-item d-flex justify-content-between">
												<h4>Total (USD)</h4>
												<strong className="prices">${total()}</strong>
											</li>
										</ul>
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
