import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
	const services = [
		{
			id: 1,
			name: "Equine portrait",
			txt: "Equine portraiture is a beautiful and timeless way to capture the spirit and beauty of your horse. Whether you are a competitive rider or simply a horse lover, an equine portrait is a wonderful way to celebrate your equine partner.",
			alt: "a white horse with long hair",
			img: "/assets/Equineportraiture.jpg",
			price: [
				"Basic package: \u0024200 - \u0024400",
				"Deluxe package: \u0024500 - \u0024800",
				"Premium package: \u00241,000 - \u00242,000",
			],
		},
		{
			id: 2,
			name: "Event photography",
			txt: "Event photography is a specialized type of photography that captures the essence of an event through images. Whether it's a small private gathering or a large public event, event photography requires skill and experience to capture the best moments of the occasion.",
			alt: 'a person riding a horse in a barrel race',
			img: "/assets/Eventphotography.jpg",
			price: [
				"Hourly rate: \u0024100 - \u0024300 per hour",
				"Half-day rate: \u0024400 - \u0024800",
				"Full-day rate: \u0024800 - \u00241,500",
			],
		},
		{
			id: 3,
			name: "Fine art photography",
			txt: "Our fine art photography sessions are perfect for anyone looking to capture stunning images of their equine companions. Whether you're a horse owner, breeder, or simply a lover of these magnificent animals, we'll work with you to create a beautiful piece of art that you can treasure for years to come.",
			alt: "a close up of a horse's eye",
			img: "/assets/Fine art photography.jpg",
			price: [
				"Individual print: \u0024100 - \u0024300",
				"Limited edition prints: \u0024500 - \u00242,000",
				"Custom commissions: \u00242,000 - \u00245,000+",
			],
		},
		{
			id: 4,
			name: "Advertising and marketing photography",
			txt: "Advertising and marketing photography is a specialized type of photography that focuses on creating high-quality images that can be used in promotional materials such as advertisements, billboards, and websites. It requires a keen eye for detail and a deep understanding of branding and marketing strategies.",
			alt: 'a horse standing in a field',
			img: "/assets/Advertising and marketing photography.jpg",
			price: [
				" Half-day rate: \u0024500 - \u00241,000",
				"Full-day rate: \u00241,000 - \u00242,500",
				"Usage and licensing fees may apply.",
			],
		},
		{
			id: 5,
			name: "Editorial and journalistic photography",
			txt: "This perfect for journalists, and publishers who need high-quality, visually stunning images to accompany their stories. Whether you need photographs of breaking news events, human interest stories, or feature articles, we have the skills and expertise to deliver exceptional results.",
			alt: 'a person standing next to a horse',
			img: "/assets/Editorial and journalistic photography.jpg",
			price: [
				"Assignment-based rates: \u0024200 - \u0024500 per assignment",
				"Usage and licensing fees may apply.",
			],
		},
		{
			id: 6,
			name: "Equine lifestyle photography",
			txt: "Our equine lifestyle photography service is ideal for horse owners who want to capture the magic of their equine companion in a natural setting. We work closely with our clients to create a personalized experience that captures the unique personality of their horse. Our goal is to create stunning, timeless images that will be treasured for years to come.",
			alt: 'a person kneeling next to a horse',
			img: "/assets/Equine lifestyle photography.jpg",
			price: [
				"Hourly rate: \u0024150 - \u0024300 per hour",
				"Half-day rate: \u0024500 - \u0024800",
				"Full-day rate: \u00241,000 - \u00241,500",
			],
		},
	];

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
			<div className="album py-5 highlight-color">
				<div className="s-container">
					<div
						className={`row row-cols-1 row-cols-sm-2 ${
							isMobile ? "row-cols-md-2" : "row-cols-md-3"
						}  g-3`}
					>
						{services?.map((service) => (
							<div className="col" key={service.id}>
								<div className="card shadow-sm">
									<img src={service.img} className="card-img-top" alt={service.alt} />
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

										<Link to={"/contact"}>
											<button>Book Now!</button>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
