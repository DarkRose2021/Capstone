import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const ShowClientPics = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [loading, setLoading] = useState(true);
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
		let getUrl = `https://mane-frame-backend.onrender.com/findUser/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User[0]);
				setPics(data.User[0].Images);
				setLoading(false); // Set loading to false when the data is received
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		loadAPI();
	}, [id]);

	function deleteImage(id, imageUrl) {
		setLoading(true)
		const getUrl = `https://mane-frame-backend.onrender.com/deleteImages/${id}/${imageUrl}`;
		fetch(getUrl)
			.then((r) => r.json())
			.then((data) => {
				setUser(data.User);
				setPics(data.User.Images);
				loadAPI()
				setLoading(false)
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			{roles?.includes("Admin") ? (
				<>
					{loading ? ( // Display loading animation while loading is true
						<div className="loading-container">
							<div className="loadingio-spinner-spinner-la1rcf32xa">
								<div className="ldio-t5ijoz38lif">
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
							{user ? (
								<>
									<h1>{user?.Name}'s Pictures</h1>
									<div className="clientPicBtn">
											<Link to={`/editImages/${id}`}>
										<button>Edit Pictures</button>
									</Link>
									</div>
									
									<div className="pics adminPics">
										{pics?.map((pic) => (
											<div key={pic.name}>
												<img src={pic.url} />
												<div className="delImage">
													<button
														onClick={() => deleteImage(user._id, pic.name)}
													>
														Delete Image
													</button>
												</div>
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
