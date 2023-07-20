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
				<></>
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
