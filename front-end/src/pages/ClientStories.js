import React from "react";

const ClientStories = () => {
	// add list of clients with their images
	const clients = [
		{
			name: "Sarah and her horse Apache",
			about:
				"Sarah is a competitive barrel racer, and she and Apache have been a team for over five years. They've won multiple regional competitions, and Sarah credits Apache's speed and agility for their success.",
			img: "",
			id: 1,
		},
		{
			name:"Tyler and his horse Duke",
			about: "Tyler is a ranch hand who works on a large cattle ranch in Texas. He and Duke are responsible for rounding up and herding the cattle, and Tyler says that Duke is one of the smartest and most reliable horses he's ever worked with.",
			img: "",
			id: 2,
		},
		{
			name: "Emily and her horse Daisy",
			about: "Emily is a horse trainer who specializes in natural horsemanship techniques. She rescued Daisy from a neglectful situation, and has spent years rehabilitating her and training her to be a confident and well-behaved riding horse.",
			img: "",
			id: 3
		},
		{
			name:"Jack and his horse Trigger",
			about: "Jack is a retired rodeo cowboy who used to compete in bull riding and saddle bronc events. These days, he spends most of his time on his ranch, and he and Trigger still enjoy going for rides and reminiscing about their rodeo days.",
			img: "/assets/pexels-pixabay-162520.jpg",
			id: 4,
		}
	];

	return (
		<div className="servicesPage">
			<h1>Client Stories</h1>
			{/* eventually put in to something that I can loop over */}
			<div className="album py-5 highlight-color">
				<div class="s-container">
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						{clients?.map((client) =>(
						<div className="col" key={client.id}>
							<div className="card shadow-sm">
								<img src={client.img} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{client.name}</h5>
									<p className="card-text">{client.about}</p>
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

export default ClientStories;
