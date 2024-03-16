import React from "react";
import { useEffect, useState } from "react";

const Popup = () => {
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		const popupShown = localStorage.getItem("popupShown");

		if (!popupShown) {
			setShowPopup(true);
		}
	}, []);

	const handleClosePopup = () => {
		setShowPopup(false);
		localStorage.setItem("popupShown", "true");
	};

	return (
		<>
			{showPopup && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p>
								This is a website for a fake business.{" "}
								<b className="error">DO NOT</b> put any personal information on
								this site.
								<br />
								With that out of the way, <br />
								<b className="capstone">Welcome to my Capstone Project!</b>
							</p>
							<button className="close-button" onClick={handleClosePopup}>
								I understand!
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Popup;
