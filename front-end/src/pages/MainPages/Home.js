import React, { useEffect } from "react";
import logo from "../../logo.png";

const Home = () => {

	return (
		<div>
			<h1>Mane Frame Photography</h1>
			<div className="container">
				<div
					id="carouselExampleInterval"
					className="carousel slide w-70"
					data-bs-ride="carousel"
				>
					<div className="carousel-inner">
						<div className="carousel-item active" data-bs-interval="2000">
							<img src="/assets/home/home1.jpg" className="d-block w-100" alt="a group of horses in a field" />
						</div>
						<div className="carousel-item" data-bs-interval="3000">
							<img src="/assets/home/home2.jpg" className="d-block w-100" alt="a group of people riding horses on a beach" />
						</div>
						<div className="carousel-item" data-bs-interval="4000">
							<img src="/assets/home/home3.jpg" className="d-block w-100" alt="a group of horses grazing in a field" />
						</div>
						<div className="carousel-item" data-bs-interval="5000">
							<img src="/assets/home/home4.jpg" className="d-block w-100" alt="a horse standing on a grassy hill" />
						</div>
						<div className="carousel-item" data-bs-interval="6000">
							<img src="/assets/home/home5.jpg" className="d-block w-100" alt="a horse in a corral" />
						</div>
						<div className="carousel-item" data-bs-interval="7000">
							<img src="/assets/home/home6.jpg" className="d-block w-100" alt="two horses standing in the snow" />
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleInterval"
						data-bs-slide="prev"
					>
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleInterval"
						data-bs-slide="next"
					>
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
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
							<h3>
								Spring Fling Horse Show - May 21-23 - Sacramento, California
							</h3>
						</li>
						<li>
							<h3>Reno Rodeo - Jun 15-24 - Reno, Nevada</h3>
						</li>
						<li>
							<h3>
								Wrangler National Finals Rodeo - Dec 1-10 - Las Vegas, Nevada
							</h3>
						</li>
					</ul>
				</div>
			</div>

			<div className="services">
				<h2>Popular Services</h2>
				<div>
					<ul>
						<li>
							<h3>Equine portraiture</h3>
						</li>
						<li>
							<h3>Event photography</h3>
						</li>
						<li>
							<h3>Equine lifestyle photography</h3>
						</li>
					</ul>
				</div>
			</div>
			<br />
			<br />
		</div>
	);
};

export default Home;
