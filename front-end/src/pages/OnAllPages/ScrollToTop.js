import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const handleScroll = () => {
		const scrolled = document.documentElement.scrollTop;
		setIsVisible(scrolled > 100); // You can adjust this value based on your preference
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const checkIsMobile = () => {
		setIsMobile(window.innerWidth <= 809);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", checkIsMobile);
		};
	}, []);

	return (
		<>
			<button
				onClick={scrollToTop}
				className="scrollBtn"
				style={{
					display: isVisible && !isMobile ? "block" : "none",
				}}
			>
				Scroll to Top <i class="bi bi-arrow-up-square-fill"></i>
			</button>

			<i
				onClick={scrollToTop}
				class="bi bi-arrow-up-square-fill scrollBtnMobile"
				style={{
					display: isVisible && isMobile ? "block" : "none",
				}}
			></i>
		</>
	);
};

export default ScrollToTop;
