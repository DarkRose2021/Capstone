import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import Compressor from "compressorjs";
import { Link, Navigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";

const uploadImagesToBackend = async (images, id) => {
	// Send the images to the backend using an API call
	// Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint
	try {
		console.log(JSON.stringify({ images }))
		await fetch(`/editImgs/${id}`, {
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

				
					<ImageUploading
						multiple
						value={images}
						onChange={onChange}
						maxNumber={maxNumber}
						dataURLKey="data_url"
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
									Click or Drop here
								</button>
								&nbsp;
								<button onClick={onImageRemoveAll}>Remove all images</button>&nbsp;
								<button onClick={handleUploadImages}>Upload Images</button>
								</div>
								<div className="upload__image-wrapper">
								<div className="flex">
									{imageList.map((image, index) => (
										<div key={index} className="image-item">
											<img src={image["data_url"]} alt="" width="100" />
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
								</div></div>
								{({ imageList, onImageUpload, onImageRemoveAll, errors }) =>
									errors && (
										<div>
											{errors.maxNumber && (
												<span>Number of selected images exceed maxNumber</span>
											)}
											{errors.acceptType && (
												<span>Your selected file type is not allow</span>
											)}
											{errors.maxFileSize && (
												<span>Selected file size exceed maxFileSize</span>
											)}
											{errors.resolution && (
												<span>
													Selected file is not match your desired resolution
												</span>
											)}
										</div>
									)
								}
								{({ imageList, dragProps, isDragging }) => (
									<div {...dragProps}>
										{isDragging ? "Drop here please" : "Upload space"}
										{imageList.map((image, index) => (
											<img key={index} src={image.data_url} />
										))}
									</div>
								)}
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
