import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const ShowClientPics = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	let { id } = useParams();

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

	const [user, setUser] = useState(null);
	const [pics, setPics] = useState(null);

	function loadAPI() {
		let getUrl = `http://localhost:5000/findUser/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User[0]);
				setPics(data.User[0].Images);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
	}, [id]);

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
					{user ? (
						<>
							<h1>{user?.Name}'s Pictures</h1>
							<div className="pics adminPics">
								{pics?.map((pic) => (
                                    <a>
									<img src={pic.url} />
                                    </a>
								))}
							</div>
							<br />
							<br />
						</>
					) : (
						<></>
					)}
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
				</>
			)}
		</div>
	);
};

export default ShowClientPics;
