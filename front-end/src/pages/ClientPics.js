import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const ClientPics = () => {
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
	// will change to come from the database
	//testing pictures
	const pics = [
		"/assets/Equineportraiture.jpg",
		"/assets/Eventphotography.jpg",
		"/assets/Fine art photography.jpg",
		"/assets/Advertising and marketing photography.jpg",
		"/assets/Editorial and journalistic photography.jpg",
		"/assets/Equine lifestyle photography.jpg",
	];
	return (
		<div>
			{/* might make the images clickable to view a larger one */}
			{/* make images downloadable */}
			{roles?.includes("Client") ? (
				<>
					<h1>Your Pictures</h1>
					<div className="pics">
						{pics?.map((pic) => (
							<img src={pic} />
						))}
					</div>
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
					<Navigate to={"/login"} />
				</>
			)}
		</div>
	);
};

export default ClientPics;
