import React from "react";
import logo from "../logo.png";

const Home = () => {
	// let image = require("../logo.png");

	{
		/* <img src={} alt="image not found" /> */
	}

	return (
		<div>
			<h1>Mane Frame Photography</h1>
			{/* <br />
			<br />
			<br />
			<div className="container">
				carousel format from bootstrap 
				<div
					id="carouselExampleIndicators"
					className="carousel slide"
					data-bs-ride="true"
				>
					<div className="carousel-indicators">
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="0"
							className="active"
							aria-current="true"
							aria-label="Slide 1"
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="1"
							aria-label="Slide 2"
						></button>
						<button
							type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="2"
							aria-label="Slide 3"
						></button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src="" className="d-block w-100" alt="" />
						</div>
						<div className="carousel-item">
							<img src="" className="d-block w-100" alt="" />
						</div>
						<div className="carousel-item">
							<img src="" className="d-block w-100" alt="" />
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div> */}
			<div className="intro-txt">
				<div>
					<p>
						At Mane Frame, we understand the beauty and majesty of horses.
						That's why we specialize in capturing the grace, power, and elegance
						of these magnificent animals through stunning photography. Whether
						you're looking for a timeless portrait of your beloved equine
						companion or action shots of horses in motion, we have the skills
						and experience to create images that will take your breath away. Our
						team of professional photographers are passionate about horses and
						dedicated to delivering exceptional results. Let us help you create
						lasting memories of your equine friends that you'll cherish for
						years to come.
					</p>
				</div>
			</div>

			<div className="events">
				<h2>Upcoming Events</h2>
				<div>
					<ul>
						<li>
							<h3>Spring Fling Horse Show - May 21-23 - Sacramento, California</h3>
						</li>
						<li><h3>Reno Rodeo - Jun 15-24 - Reno, Nevada</h3></li>
						<li>
							<h3>Wrangler National Finals Rodeo - Dec 1-10 - Las Vegas, Nevada</h3>
						</li>
					</ul>
				</div>
			</div>

			<div className="services">
				<h2>Popular Services</h2>
				<div>
					<ul>
						<li><h3>Equine portraiture</h3></li>
						<li><h3>Event photography</h3></li>
						<li><h3>Equine lifestyle photography</h3></li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
