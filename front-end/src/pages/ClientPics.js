import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { saveAs } from "file-saver";

const ClientPics = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	let email = null

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

	const [user, setUser] = useState(null)
	const [pics, setPics] = useState(null)

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User);
				setPics(data.User.Images)
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
		}, [email]);

	function downloadImage (url, name) {
		saveAs(url, name); // Put your image url here.
	};

	return (
		<div>
			{/* might make the images clickable to view a larger one */}
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
					<br />
					<br />
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
