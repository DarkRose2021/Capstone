import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { saveAs } from "file-saver";

const ClientPics = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [loading, setLoading] = useState(true);
	let email = null;

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

	const [user, setUser] = useState(null);
	const [pics, setPics] = useState(null);

	function loadAPI() {
		let getUrl = `https://mane-frame-backend.onrender.com/findUserEmail/${email}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User);
				setPics(data.User.Images);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
	}, [email]);

	function downloadImage(url, name) {
		saveAs(url, name);
	}

	return (
		<div>
			{roles?.includes("Client") ? (
				loading ? ( // Display loading animation while loading is true
					<div className="loading-container">
						<div class="loadingio-spinner-spinner-la1rcf32xa">
							<div class="ldio-t5ijoz38lif">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				) : (
					<>
						{pics && pics.length > 0 ? (
							<h1>Your Pictures</h1>
						) : (
							<h1>No pictures to show right now</h1>
						)}
						<div className="pics">
							{pics?.map((pic) => (
								<a onClick={() => downloadImage(pic.url, pic.name)}>
									<img src={pic.url} />
								</a>
							))}
						</div>
						<br />
					</>
				)
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
