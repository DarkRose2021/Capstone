import React, { useEffect } from "react";
import logo from "../logo.png";

const Home = () => {
	function disclaimer() {
		alert(
			"This website is for a fake business. \n Do not put any personal information on this website"
		);
	}

	useEffect(() => {
		disclaimer();
	}, []);

	return (
		<div>
			<h1>Mane Frame Photography</h1>
			<div className="container">
				<div
					id="carouselExampleInterval"
					class="carousel slide"
					data-bs-ride="carousel"
				>
					<div class="carousel-inner">
						<div class="carousel-item active" data-bs-interval="10000">
							<img src="/assets/home1.jpg" class="d-block w-100" alt="..." />
						</div>
						<div class="carousel-item" data-bs-interval="2000">
							<img src="/assets/home2.jpg" class="d-block w-100" alt="..." />
						</div>
						<div class="carousel-item" data-bs-interval="3000">
							<img src="/assets/home3.jpg" class="d-block w-100" alt="..." />
						</div>
						<div class="carousel-item" data-bs-interval="4000">
							<img src="/assets/home4.jpg" class="d-block w-100" alt="..." />
						</div>
						<div class="carousel-item" data-bs-interval="5000">
							<img src="/assets/home5.jpg" class="d-block w-100" alt="..." />
						</div>
						<div class="carousel-item">
							<img src="/assets/home6.jpg" class="d-block w-100" alt="..." />
						</div>
					</div>
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleInterval"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleInterval"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
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
		</div>
	);
};

export default Home;
