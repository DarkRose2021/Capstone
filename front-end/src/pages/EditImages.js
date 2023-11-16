import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

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
	const maxNumber = 11;

	const onChange = async (imageList, addUpdateIndex) => {
		setImages(imageList.filter((img) => img !== null));
	};

	const handleUploadImages = () => {
		// Call the API function to send the images to the backend
		uploadImagesToBackend(images, id);
		setImages([]);
		setMsg("Images Uploaded!");
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

	const navigate = useNavigate();

	const handleShowPictures = () => {
		navigate(`/ShowImages/${id}`);
	};

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
						imgExtension={[".jpg", ".jpeg", ".png"]}
					>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
							errors
						}) => (
							<div>
								{errors && (
									<div>
										{errors.maxNumber && (
											<span className="error errorCenter">Number of selected images exceed {maxNumber}</span>
										)}
										{errors.acceptType && (
											<span className="error errorCenter">Your selected file type is not allowed. The allowed types are jpg, jpeg, and png</span>
										)}
										{errors.maxFileSize && (
											<span className="error errorCenter">Selected file size exceeds maxFileSize</span>
										)}
										{errors.resolution && (
											<span className="error errorCenter">
												Selected file does not match your desired resolution
											</span>
										)}
									</div>
								)}

								<div className="btnDiv">
									<div className="buttons">
										<button
											style={isDragging ? { color: "red" } : undefined}
											onClick={onImageUpload}
											{...dragProps}
										>
											<i class="bi bi-upload currentColor"></i>{" "}
											Click or Drop here
										</button>
										&nbsp;
										<button onClick={onImageRemoveAll}>
											Remove all images
										</button>
										&nbsp;
										<button onClick={handleUploadImages}>Upload Images</button>
										&nbsp;
										<button onClick={handleShowPictures}>Show Pictures</button>
									</div>
									<div className="upload__image-wrapper">
										<div className="flex">
											{msg ? <h2>{msg}</h2> : <></>}
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
