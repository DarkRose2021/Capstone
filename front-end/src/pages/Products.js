import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Products = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [user, setUser] = useState(null);
	const [products, setProducts] = useState(null);
	const [productBtnTexts, setProductBtnTexts] = useState({});
	const [productQuantities, setProductQuantities] = useState({});
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
		let url = `http://localhost:5000/products`;
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				setProducts(data);
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
		console.log(dataToSend);

		let getUrl = `http://localhost:5000/addToCart/${JSON.stringify(
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
			[productId]: event.target.value || 1,
		};
		setProductQuantities(newQuantities);
	};

	return (
		<div className="products">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
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
													{/* + */}
													{/* add input for the + and - later */}
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
													<input
														className="customQty"
														type="number"
														value={productQuantities[product._id] || 1}
														onChange={(e) => handleChange(e, product._id)}
													/>{" "}
													{/* - */}
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
												</div>
												<button onClick={() => addToCart(product._id)}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-cart-plus-fill"
														viewBox="0 0 16 16"
													>
														<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
													</svg>{" "}
													{productBtnTexts[product._id] || "Add to Cart"}
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<>
						<h1>You don't have permission to view this page</h1>
						{/* <Navigate to={"/login"} /> */}
					</>
				</>
			)}
		</div>
	);
};

export default Products;
