import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const Home = () => {
	return (
		<div>
			<h1>Mane Frame Photography</h1>

			<div className="container">
				<Carousel>
					<Carousel.Item interval={2000}>
						<Image bsPrefix="d-block w-100" src="/assets/home/home1.jpg" text="First slide" />
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<Image src="/assets/home/home2.jpg" text="First slide" />
					</Carousel.Item>
					<Carousel.Item interval={4000}>
						<Image src="/assets/home/home3.jpg" text="First slide" />
					</Carousel.Item>
					<Carousel.Item interval={5000}>
						<Image src="/assets/home/home4.jpg" text="First slide" />
					</Carousel.Item>
					<Carousel.Item interval={6000}>
						<Image src="/assets/home/home5.jpg" text="First slide" />
					</Carousel.Item>
					<Carousel.Item interval={7000}>
						<Image src="/assets/home/home6.jpg" text="First slide" />
					</Carousel.Item>
				</Carousel>
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
