import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useParams } from "react-router-dom";

const uploadImagesToBackend = async (images, id) => {
	// Send the images to the backend using an API call
	try {
		await fetch(`http://localhost:5000/editImgs/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ images }),
		});
		// Handle successful upload if needed
		console.log("Images uploaded successfully");
	} catch (error) {
		// Handle upload error if needed
		console.error("Error uploading images:", error);
	}
};

const EditImages = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
	const [user, setUser] = useState(null);
	const [msg, setMsg] = useState(null);
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

	const [images, setImages] = useState([]);
	const maxNumber = 50;

	const onChange = async (imageList, addUpdateIndex) => {
		setImages(imageList.filter((img) => img !== null));
	};

	const handleUploadImages = () => {
		// Call the API function to send the images to the backend
		uploadImagesToBackend(images, id);
		setImages([])
		setMsg("Images Uploaded!")
	};

	useEffect(() => {
		let getUrl = `http://localhost:5000/findUser/${id}`;
		fetch(getUrl)
			.then((data) => data.json())
			.then((data) => {
				setUser(data.User[0]);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="editImgsCont">
			{roles?.includes("Admin") ? (
				<>
				<h1>Editing {user?.Name}'s Images</h1>
					<ImageUploading
						multiple
						value={images}
						onChange={onChange}
						maxNumber={maxNumber}
						dataURLKey="url"
						imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
					>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
						}) => (
							// write your building UI
							<div className="btnDiv">
								<div className="buttons">
									<button
										style={isDragging ? { color: "red" } : undefined}
										onClick={onImageUpload}
										{...dragProps}
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
</svg> Click or Drop here
									</button>
									&nbsp;
									<button onClick={onImageRemoveAll}>Remove all images</button>
									&nbsp;
									<button onClick={handleUploadImages}>Upload Images</button>
								</div>
								<div className="upload__image-wrapper">
									<div className="flex">
										{msg? (<h2>{msg}</h2>):(<></>)}
										{imageList.map((image, index) => (
											<div key={index} className="image-item">
												<img src={image["url"]} alt="" width="100" />
												<div className="image-item__btn-wrapper">
													<button onClick={() => onImageUpdate(index)}>
														Update
													</button>
													<button onClick={() => onImageRemove(index)}>
														Remove
													</button>
												</div>
											</div>	
										))}
									</div>
								</div>
							</div>
						)}
					</ImageUploading>
				</>
			) : (
				<>
					<h1>You don't have permission to view this page</h1>
				</>
			)}
		</div>
	);
};

export default EditImages;