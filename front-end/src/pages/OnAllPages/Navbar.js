import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logo from "../../logo.png";

import Home from "../MainPages/Home";
import About from "../MainPages/About";
import Contact from "../MainPages/Contact";
import Services from "../MainPages/Services";
import Team from "../MainPages/Team";
import Login from "../MainPages/Login";
import Signin from "../MainPages/Signin";
import Checkout from "../CheckoutProcess/Checkout";
import Products from "../CheckoutProcess/Products";
import ClientPics from "../Client/ClientPics";
import Admin from "../Admin/Admin";
import Cart from "../CheckoutProcess/Cart";
import ClientStories from "../MainPages/ClientStories";
import Confirm from "../CheckoutProcess/Confirm";
import EditRoles from "../Admin/EditRoles";
import NotFound from "../ErrorPages/NotFound";
import EditImages from "../Admin/EditImages";
import ShowClientPics from "../Admin/ShowClientPics";
import BookingForm from "../MainPages/BookingForm";
import BookingInfo from "../Admin/BookingInfo";
import ReviewOrder from "../CheckoutProcess/ReviewOrder";

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState(null);
	const [roles, setRoles] = useState(null);
	let str = null;
	let newEmail = null;

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0 && localStorage.getItem("Name")) {
				setLoggedIn(true);
				str = localStorage.getItem("Name");
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
		localStorage.removeItem("Name");
		localStorage.removeItem("Roles");
		setLoggedIn(false);
		window.location.reload();
	};
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

	return (
		<div className="layout">
			<BrowserRouter>
				<header>
					<nav
						className="navbar navbar-expand-sm navbar-toggleable mb-3"
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
									{loggedIn ? (
										<>
											{isMobile ? (
												<>
													<li className="nav-item dropdown">
														<a
															className="nav-link dropdown-toggle"
															href="#"
															role="button"
															data-bs-toggle="dropdown"
															aria-expanded="false"
														>
															{roles.includes("Client") ? "Client" : "Admin"}
														</a>
														<ul className="dropdown-menu">
															<li>
																{loggedIn === true &&
																(roles.includes("Client") ||
																	roles.includes("Admin")) ? (
																	<li>
																		<Link
																			to="/products"
																			className="dropdown-item"
																		>
																			Products
																		</Link>
																	</li>
																) : (
																	<></>
																)}
															</li>
															<li>
																{loggedIn === true &&
																(roles.includes("Client") ||
																	roles.includes("Admin")) ? (
																	<li>
																		<Link to="/cart" className="dropdown-item">
																			Cart
																		</Link>
																	</li>
																) : (
																	<></>
																)}
															</li>

															{loggedIn === true && roles.includes("Client") ? (
																<li>
																	<Link
																		to="/client-pictures"
																		className="dropdown-item"
																	>
																		Your Pictures
																	</Link>
																</li>
															) : (
																<></>
															)}
															{loggedIn === true && roles.includes("Admin") ? (
																<li>
																	<Link
																		to="/adminHome"
																		className="dropdown-item"
																	>
																		Admin Home
																	</Link>
																</li>
															) : (
																<></>
															)}
														</ul>
													</li>
												</>
											) : (
												<>
													{loggedIn === true && roles.includes("Client") ? (
														<li className="nav-item">
															<Link to="/client-pictures" className="nav-link">
																Your Pictures
															</Link>
														</li>
													) : (
														<></>
													)}
													{loggedIn === true && roles.includes("Admin") ? (
														<li className="nav-item">
															<Link to="/adminHome" className="nav-link">
																Admin Home
															</Link>
														</li>
													) : (
														<></>
													)}
													{loggedIn === true &&
													(roles.includes("Client") ||
														roles.includes("Admin")) ? (
														<li className="nav-item">
															<Link to="/products" className="nav-link">
																Products
															</Link>
														</li>
													) : (
														<></>
													)}
													{loggedIn === true &&
													(roles.includes("Client") ||
														roles.includes("Admin")) ? (
														<li className="nav-item">
															<Link to="/cart" className="nav-link">
																Cart
															</Link>
														</li>
													) : (
														<></>
													)}
													{loggedIn === true &&
													(roles.includes("Client") ||
														roles.includes("Admin")) ? (
														<li className="nav-item">
															<Link to="/checkout" className="nav-link">
																Checkout
															</Link>
														</li>
													) : (
														<></>
													)}
												</>
											)}
										</>
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
										{isMobile ? (
											<>
												<li className="welcome dropdown">
													<a
														className="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														Welcome {email}!
													</a>
													<ul className="dropdown-menu">
														<li>
															<a
																href="#"
																onClick={logout}
																className="dropdown-item"
															>
																Logout
															</a>
														</li>
													</ul>
												</li>
											</>
										) : (
											<>
												<a className="navbar-text welcome">Welcome {email}!</a>
												<a href="#" onClick={logout} className="nav-link">
													Logout
												</a>
											</>
										)}
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
						<Route path="/ShowImages/:id" element={<ShowClientPics />} />
						<Route path="/BookingForm" element={<BookingForm />} />
						<Route path="/BookingInfo/:id" element={<BookingInfo />} />
						<Route path="/ReviewOrder" element={<ReviewOrder />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default Navbar;
