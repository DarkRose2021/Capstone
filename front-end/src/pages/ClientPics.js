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
		let getUrl = `https://mane-frame-backend.onrender.com/findUserEmail/${email}`;
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
		saveAs(url, name); 
	};

	return (
		<div>
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
					{/* show when user hovers over the image */}
					{/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg> */}
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
