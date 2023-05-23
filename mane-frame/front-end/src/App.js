import logo from "./logo.png";
import "./App.scss";
import Home from "./pages/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";

function App() {
	return (
		<div>
			<div className="layout">
				<BrowserRouter>
					<header>
						<nav
							className="navbar navbar-expand-sm navbar-toggleable-sm mb-3"
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
											<Link to="/products" className="nav-link">
												Products
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/checkout" className="nav-link">
												Checkout
											</Link>
										</li>
									</ul>
									{/* <a className="nav-link" >Sign Up</a> <br />
                    <a className="nav-link" >Login</a> */}
								</div>
							</div>
						</nav>
					</header>
					<div>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />}>
								{" "}
								/
							</Route>
							<Route path="/services" element={<Services />}>
								{" "}
								/
							</Route>
							<Route path="/contact" element={<Contact />}>
								{" "}
								/
							</Route>
							<Route path="/team" element={<Team />}>
								{" "}
								/
							</Route>
							<Route path="/login" element={<Login />}>
								{" "}
								/
							</Route>
							<Route path="/signup" element={<Signin />}>
								{" "}
								/
							</Route>
							<Route path="/admin" element={<Login />}>
								{" "}
								/
							</Route>
							<Route path="/checkout" element={<Checkout />}>
								{" "}
								/
							</Route>
							<Route path="/products" element={<Products />}>
								{" "}
								/
							</Route>
						</Routes>
					</div>
				</BrowserRouter>
			</div>
			<footer className="footer">
				<div className="container">
					&copy; Mane Frame Photography - <a href="#top">Back to Top</a>
					<br />
					All text generated with ChatGPT - All images from{" "}
					<a href="https://www.pexels.com/">Pexels</a>
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
