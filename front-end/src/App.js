import logo from "./logo.png";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import ClientPics from "./pages/ClientPics";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import ClientStories from "./pages/ClientStories";
import Confirm from "./pages/Confirm";
import EditRoles from "./pages/EditRoles";
import NotFound from "./pages/NotFound";
import EditImages from "./pages/EditImages";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState(null);
	const [roles, setRoles] = useState(null);
	let str = null;
	let newEmail = null;

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0 && localStorage.getItem("Valid Email")) {
				setLoggedIn(true);
				str = localStorage.getItem("Valid Email");
				newEmail = str.replace(/^"(.*)"$/, "$1");
				setEmail(newEmail);
				setRoles(localStorage.getItem("Roles"));
			}
		};

		window.addEventListener("storage", handleStorage());
		return () => window.removeEventListener("storage", handleStorage());
	}, []);

	const logout = () => {
		localStorage.removeItem("Valid Email");
		localStorage.removeItem("Roles");
		setLoggedIn(false);
		window.location.reload();
	};

	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		// Check local storage for the flag
		const popupShown = localStorage.getItem("popupShown");

		// If the flag is not set, show the pop-up
		if (!popupShown) {
			setShowPopup(true);
		}
	}, []);

	const handleClosePopup = () => {
		setShowPopup(false);
		// Set the flag in local storage when the user closes the pop-up
		localStorage.setItem("popupShown", "true");
	};

	return (
		<div>
			{showPopup && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p>
								This is a website for a fake business. <b className="error">DO NOT</b> put any
								personal information on this site.
								<br /> 
								With that out of the way, <br />
								<b className="capstone">Welcome to my Capstone Project!</b>
							</p>
							<button className="close-button" onClick={handleClosePopup}>
								I understand!
							</button>
						</div>
					</div>
				</>
			)}
			<div className="layout">
				<BrowserRouter>
					<header>
						<nav
							className="navbar navbar-expand-lg navbar-toggleable mb-3"
							id="top"
						>
							<div className="container-fluid">
								<Link to="/" className="navbar-brand" src="">
									<img src={logo} alt="text" />
								</Link>
								<button
									className="navbar-toggler"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target=".navbar-collapse"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
									<ul className="navbar-nav flex-grow-1">
										<li className="nav-item">
											<Link to="/" className="nav-link">
												Home
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/about" className="nav-link">
												About
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/services" className="nav-link">
												Services
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/contact" className="nav-link">
												Contact us
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/team" className="nav-link">
												Team
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/clientStories" className="nav-link">
												Client Stories
											</Link>
										</li>
										{loggedIn === true && roles.includes("Client") ? (
											<li className="nav-item">
												<Link to="/client-pictures" className="nav-link">
													Your Pictures
												</Link>
											</li>
										) : (
											<></>
										)}
										{loggedIn === true &&
										(roles.includes("Client") || roles.includes("Admin")) ? (
											<li className="nav-item">
												<Link to="/products" className="nav-link">
													Products
												</Link>
											</li>
										) : (
											<></>
										)}
										{loggedIn === true &&
										(roles.includes("Client") || roles.includes("Admin")) ? (
											<li className="nav-item">
												<Link to="/checkout" className="nav-link">
													Checkout
												</Link>
											</li>
										) : (
											<></>
										)}

										{loggedIn === true && roles.includes("Admin") ? (
											<li className="nav-item">
												<Link to="/adminHome" className="nav-link">
													AdminHome
												</Link>
											</li>
										) : (
											<></>
										)}
										{loggedIn === true &&
										(roles.includes("Client") || roles.includes("Admin")) ? (
											<li className="nav-item">
												<Link to="/cart" className="nav-link">
													Cart
												</Link>
											</li>
										) : (
											<></>
										)}
									</ul>
									{loggedIn === true ? (
										<></>
									) : (
										<>
											<Link to="/login" className="nav-link signin">
												Login
											</Link>
											<Link to="/signup" className="nav-link signin">
												Sign Up
											</Link>
										</>
									)}

									{/* only show when a user is logged in */}
									{loggedIn === true ? (
										<>
											<a className="navbar-text welcome">Welcome {email}!</a>
											<a href="#" onClick={logout} className="nav-link">
												Logout
											</a>
										</>
									) : (
										<></>
									)}
								</div>
							</div>
						</nav>
					</header>
					<div>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/services" element={<Services />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/team" element={<Team />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signin />} />
							<Route path="/admin" element={<Login />} />
							<Route path="/checkout" element={<Checkout />} />
							<Route path="/products" element={<Products />} />
							<Route path="/client-pictures" element={<ClientPics />} />
							<Route path="/adminHome" element={<Admin />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/clientStories" element={<ClientStories />} />
							<Route path="/confirm" element={<Confirm />} />
							<Route path="/edit/:id" element={<EditRoles />} />
							<Route path="/editImages/:id" element={<EditImages />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
			<footer className="footer">
				<div className="container">
					&copy; Mane Frame Photography - <a href="#top">Back to Top</a>
					<br />
					All text generated with ChatGPT - All images from{" "}
					<a
						href="https://www.pexels.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Pexels
					</a>
					<br />
					<b>
						THIS WEBSITE IS NOT FOR A REAL BUSINESS. DO NOT PUT ANY PERSONAL
						INFORMATION ON THIS WEBSITE
					</b>
				</div>
			</footer>
		</div>
	);
}

export default App;
