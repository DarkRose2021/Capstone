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

	function deleteImage(id, imageUrl) {
		const getUrl = `http://localhost:5000/deleteImages/${id}/${imageUrl}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setUser(data.Users);
				setPics(data.Users.Images);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
					{user ? (
						<>
							<h1>{user?.Name}'s Pictures</h1>
							<div className="pics adminPics">
								{pics?.map((pic) => (
                                    <div key={pic.name}>
									<img src={pic.url} />
									<button onClick={() => deleteImage(user._id, pic.url)}>Delete Image</button>
                                    </div>
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
