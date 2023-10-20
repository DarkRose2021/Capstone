import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
	const [services, setServices] = useState(null);
	const [loading, setLoading] = useState(true); // Add loading state

	useEffect(() => {
		const url = `https://mane-frame-backend.onrender.com/services`;
		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setServices(data);
				setLoading(false); // Set loading to false when the data is received
			})
			.catch((err) => console.log(err));
	}, []);

	const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
	useEffect(() => {
		window.addEventListener(
			"resize",
			() => {
				const ismobile = window.innerWidth < 1200;
				if (ismobile !== isMobile) setIsMobile(ismobile);
			},
			false
		);
	}, [isMobile]);

	return (
		<div className="servicesPage">
			<h1>Services</h1>
			{loading ? ( // Display loading animation while loading is true
				<div className="loading-container">
					<div class="loadingio-spinner-spinner-la1rcf32xa">
						<div class="ldio-t5ijoz38lif">
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
				<div className="album py-5 highlight-color">
					<div className="s-container">
						<div
							className={`row row-cols-1 row-cols-sm-2 ${
								isMobile ? "row-cols-md-2" : "row-cols-md-3"
							}  g-3`}
						>
							{services?.map((service) => (
								<div className="col" key={service._id}>
									<div className="card shadow-sm">
										<img
											src={service.img}
											className="card-img-top"
											alt={service.alt}
										/>
										<div className="card-body">
											<h5 className="card-title">{service.name}</h5>
											<p className="card-text">{service.txt}</p>
											<div>
												<h5>Prices:</h5>
												<ul className="fa-ul">
													{service.price?.map((price, index) => (
														<li key={index}>{price}</li>
													))}
												</ul>
											</div>

											<Link to={"/BookingForm"}>
												<button>Book Now!</button>
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Services;
