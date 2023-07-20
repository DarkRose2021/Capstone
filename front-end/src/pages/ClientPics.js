import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { saveAs } from "file-saver";

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
		{ name: "Equine portraiture", url: "/assets/Equineportraiture.jpg" },
		{ name: "Event photography", url: "/assets/Eventphotography.jpg" },
		{ name: "Fine art photography", url: "/assets/Fine art photography.jpg" },
		{
			name: "Advertising and marketing photography",
			url: "/assets/Advertising and marketing photography.jpg",
		},
		{
			name: "Editorial and journalistic photography",
			url: "/assets/Editorial and journalistic photography.jpg",
		},
		{
			name: "Equine lifestyle photography",
			url: "/assets/Equine lifestyle photography.jpg",
		},
	];

	function downloadImage (url, name) {
		saveAs(url, name); // Put your image url here.
	};

	return (
		<div>
			{/* might make the images clickable to view a larger one */}
			{/* make images downloadable */}
			{roles?.includes("Client") ? (
				<>
					<h1>Your Pictures</h1>
					<div className="pics">
						{pics?.map((pic) => (
							<a onClick={() => downloadImage(pic.url, pic.name)}>
								<img src={pic.url} />
							</a>
						))}
					</div>
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

export default ClientPics;
