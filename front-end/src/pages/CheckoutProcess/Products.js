import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Products = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [user, setUser] = useState(null);
	const [products, setProducts] = useState(null);
	const [productBtnTexts, setProductBtnTexts] = useState({});
	const [productQuantities, setProductQuantities] = useState({});
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState({
		UserID: "",
		ProductQty: [],
		Products: [],
	});
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

	function getProducts() {
		let url = `https://mane-frame-backend.onrender.com/products`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setProducts(data);
				setLoading(false); // Set loading to false when the data is received
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

	function addToCart(id) {
		setProductBtnTexts((prevBtnTexts) => ({
			...prevBtnTexts,
			[id]: "Item Added!",
		}));

		setTimeout(() => {
			setProductBtnTexts((prevBtnTexts) => ({
				...prevBtnTexts,
				[id]: "Add to Cart",
			}));
		}, 4000);

		items.ProductQty = Object.values(productQuantities)[0] || 1;
		items.Products = id;

		let dataToSend = {
			items: items,
		};

		let getUrl = `https://mane-frame-backend.onrender.com/addToCart/${JSON.stringify(
			dataToSend
		)}`;
		fetch(getUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((data) => data.json())
			.then((data) => {})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
		getProducts();
	}, [email]);

	useEffect(() => {
		if (user) {
			setItems({
				...items,
				UserID: user._id,
			});
		}
	}, [user]);

	const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
	useEffect(() => {
		window.addEventListener(
			"resize",
			() => {
				const ismobile = window.innerWidth < 1200;
				if (ismobile !== isMobile) setIsMobile(ismobile);
			},
			false
		);
	}, [isMobile]);

	const handleChange = (event, productId) => {
		const newQuantities = {
			...productQuantities,
			[productId]:
				event.target.value !== "" ? parseInt(event.target.value, 10) : "",
		};
		setProductQuantities(newQuantities);
	};

	return (
		<div className="products">
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
							<h1>Products</h1>
							<div className="album py-5 highlight-color">
								<div className="s-container product">
									<div
										className={`row row-cols-1 row-cols-sm-2 ${
											isMobile ? "row-cols-md-2" : "row-cols-md-3"
										} g-3`}
									>
										{products?.map((product) => (
											<div className="col" key={product._id}>
												<div className="card shadow-sm">
													<div className="card-body">
														<h3 className="card-title">{product.Name}</h3>
														<p className="card-text">{product.Description}</p>
														<h4 className="card-price">${product.Price}</h4>
														<div>
															<input
																className="customQty"
																type="number"
																value={productQuantities[product._id] || 1}
																onChange={(e) => handleChange(e, product._id)}
															/>
														</div>
														<div>
															<button onClick={() => addToCart(product._id)}>
																<i class="bi bi-cart-plus-fill"></i>{" "}
																{productBtnTexts[product._id] || "Add to Cart"}
															</button>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<>
						<h1>You don't have permission to view this page</h1>
					</>
				</>
			)}
		</div>
	);
};

export default Products;
