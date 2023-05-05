import React from "react";

const Services = () => {
	const services = [
		{
			id: 1,
			name: "Equine portraiture",
			txt: "Equine portraiture is a beautiful and timeless way to capture the spirit and beauty of your horse. Whether you are a competitive rider or simply a horse lover, an equine portrait is a wonderful way to celebrate your equine partner.",
			img: "/assets/Equineportraiture.jpg",
            price: ""
		},
		{
			id: 2,
			name: "Event photography",
			txt: "Event photography is a specialized type of photography that captures the essence of an event through images. Whether it's a small private gathering or a large public event, event photography requires skill and experience to capture the best moments of the occasion.",
			img: "/assets/Eventphotography.jpg",
            price: ""
		},
        {
			id: 3,
			name: "Fine art photography",
			txt: "Our fine art photography sessions are perfect for anyone looking to capture stunning images of their equine companions. Whether you're a horse owner, breeder, or simply a lover of these magnificent animals, we'll work with you to create a beautiful piece of art that you can treasure for years to come.",
			img: "/assets/Fine art photography.jpg",
            price: ""
		},
        {
			id: 4,
			name: "Advertising and marketing photography",
			txt: "Advertising and marketing photography is a specialized type of photography that focuses on creating high-quality images that can be used in promotional materials such as advertisements, billboards, and websites. It requires a keen eye for detail and a deep understanding of branding and marketing strategies.",
			img: "/assets/Advertising and marketing photography.jpg",
            price: ""
		},
        {
			id: 5,
			name: "Editorial and journalistic photography",
			txt: "This perfect for journalists, and publishers who need high-quality, visually stunning images to accompany their stories. Whether you need photographs of breaking news events, human interest stories, or feature articles, we have the skills and expertise to deliver exceptional results.",
			img: "/assets/Editorial and journalistic photography.jpg",
            price: ""
		},
        {
			id: 6,
			name: "Equine lifestyle photography",
			txt: "Our equine lifestyle photography service is ideal for horse owners who want to capture the magic of their equine companion in a natural setting. We work closely with our clients to create a personalized experience that captures the unique personality of their horse. Our goal is to create stunning, timeless images that will be treasured for years to come.",
			img: "/assets/Equine lifestyle photography.jpg",
            price: ""
		},
	];
	return (
		<div>
			<h1>Services</h1>
			{/* eventually put in to something that I can loop over */}
			<div class="album py-5 highlight-color">
				<div class="container">
					<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						{services?.map((service) => (
							<div className="col" key={service.id}>
								<div className="card shadow-sm">
									<img
										src={service.img}
										className="card-img-top"
										alt="..."
									/>
									<div className="card-body">
										<h5 className="card-title">{service.name}</h5>
										<p className="card-text">
                                        {service.txt}
										</p>
                                        <button>Book Now!</button>
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
