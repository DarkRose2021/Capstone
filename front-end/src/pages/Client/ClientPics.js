import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Loading from "../OnAllPages/Loading";

const ClientPics = () => {
	const [, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [loading, setLoading] = useState(true);
	let email = null;

	useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0) {
				setLoggedIn(true);
				const rolesFromStorage = localStorage.getItem("Roles");
				setRoles(rolesFromStorage);
				email = localStorage.getItem("Valid Email");
			}
		};

		handleStorage();

		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const [, setUser] = useState(null);
	const [pics, setPics] = useState(null);

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUserEmail/${email}`;
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
			{roles?.includes("Client") ||
			(roles?.includes("Client") && roles?.includes("Admin")) ? (
				// actually connected to the database
				// 	loading ? ( // Display loading animation while loading is true
				// 		<Loading />
				// 	) : (
				// 		<>
				// 			{pics && pics.length > 0 ? (
				// 				<h1>Your Pictures</h1>
				// 			) : (
				// 				<h1>No pictures to show right now</h1>
				// 			)}
				// 			<div className="pics">
				// 				{pics?.map((pic) => (
				// 					<a onClick={() => downloadImage(pic.url, pic.name)}>
				// 						<img src={pic.url} />
				// 					</a>
				// 				))}
				// 			</div>
				// 			<br />
				// 		</>
				// 	)

				<h2 className="error">
					This page currently isn't working. Please give the team some time to
					fix it!
				</h2>
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
