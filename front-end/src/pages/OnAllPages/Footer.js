import React from "react";
import ScrollToTop from "./ScrollToTop";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<span className="center">
					All text generated with ChatGPT - All images from{" "}
					<a
						href="https://www.pexels.com/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Pexels – link opens in a new tab."
					>
						Pexels
					</a>
				</span>
				<span className="left">
					<b className="right">
						THIS WEBSITE IS NOT FOR A REAL BUSINESS. DO NOT PUT ANY PERSONAL
						INFORMATION ON THIS WEBSITE
					</b>
				</span>
				&copy; Mane Frame Photography 2024 <ScrollToTop />
			</div>
		</footer>
	);
};

export default Footer;
