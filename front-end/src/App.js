import logo from "./logo.png";
import "./App.scss";
import { BrowserRouter, Link, Route, Routes, Switch } from "react-router-dom";
// import { ReactSession } from "react-client-session";

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
import Logout from "./pages/Logout";
import ClientStories from "./pages/ClientStories";
import Confirm from "./pages/Confirm";

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
											<Link to="/clientStories" className="nav-link">
												Client Stories
											</Link>
										</li>
										{/* lock */}
										<li className="nav-item">
											<Link to="/client-pictures" className="nav-link">
												Your Pictures
											</Link>
										</li>
										{/* lock */}
										<li className="nav-item">
											<Link to="/products" className="nav-link">
												Products
											</Link>
										</li>
										{/* lock */}
										<li className="nav-item">
											<Link to="/checkout" className="nav-link">
												Checkout
											</Link>
										</li>
										{/* remove later */}
										<li className="nav-item">
											<Link to="/adminHome" className="nav-link">
												AdminHome
											</Link>
										</li>
										{/* lock & change to an icon */}
										<li className="nav-item">
											<Link to="/cart" className="nav-link">
												Cart
											</Link>
										</li>
									</ul>

									<Link to="/login" className="nav-link signin">
										Login
									</Link>
									<Link to="/signup" className="nav-link signin">
										SignUp
									</Link>
									{/* only show when a user is logged in */}
									<Link to="/logout" className="nav-link">
										Logout
									</Link>
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
							<Route path="/client-pictures" element={<ClientPics />}>
								{" "}
								/
							</Route>
							<Route path="/adminHome" element={<Admin />}>
								{" "}
								/
							</Route>
							<Route path="/cart" element={<Cart />}>
								{" "}
								/
							</Route>
							<Route path="/logout" element={<Logout />}>
								{" "}
								/
							</Route>
							<Route path="/clientStories" element={<ClientStories />}>
								{" "}
								/
							</Route>
							<Route path="/confirm" element={<Confirm />}>
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
