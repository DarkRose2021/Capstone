import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Products = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);

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
	return (
		<div className="products">
			{roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
					<div className="album py-5 highlight-color">
						<div class="s-container">
							<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
								{/* {clients?.map((client) => ( */}
									<div className="col">
										<div className="card shadow-sm">
											<img
												src=""
												className="card-img-top"
												alt="..."
											/>
											<div className="card-body">
												<h5 className="card-title"></h5>
												<p className="card-text"></p>
											</div>
										</div>
									</div>
								{/* ))} */}
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
