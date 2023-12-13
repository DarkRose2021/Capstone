import React, { useEffect, useState } from "react";

const ClientStories = () => {
	// add list of clients with their images
	const clients = [
		{
			name: "Sarah and her horse Apache",
			about:
				"Sarah is a competitive barrel racer, and she and Apache have been a team for over five years. They've won multiple regional competitions, and Sarah credits Apache's speed and agility for their success.",
			alt: "a person riding a horse in a barrel race",
			img: "/assets/stories/pexels-coldbeer-15215865.jpg",
			id: 1,
		},
		{
			name: "Tyler and his horse Duke",
			about:
				"Tyler is a ranch hand who works on a large cattle ranch in Texas. He and Duke are responsible for rounding up and herding the cattle, and Tyler says that Duke is one of the smartest and most reliable horses he's ever worked with.",
			img: "/assets/stories/pexels-zeynep-seçer-13444728.jpg",
			alt: "a person riding a horse in the desert",
			id: 2,
		},
		{
			name: "Emily and her horse Daisy",
			about:
				"Emily is a horse trainer who specializes in natural horsemanship techniques. She rescued Daisy from a neglectful situation, and has spent years rehabilitating her and training her to be a confident and well-behaved riding horse.",
			img: "/assets/stories/pexels-jennifer-murray-1090408.jpg",
			alt: "a person in a pink dress standing next to a horse",
			id: 3,
		},
		{
			name: "Jack and his horse Trigger",
			about:
				"Jack is a retired rodeo cowboy who used to compete in bull riding and saddle bronc events. These days, he spends most of his time on his ranch, and he and Trigger still enjoy going for rides and reminiscing about their rodeo days.",
			alt:"a person riding a horse with a dog",
			img: "/assets/stories/pexels-pixabay-162520.jpg",
			id: 4,
		},
		{
			name: "Rachel and her horse Rusty",
			about:
				"Rachel is a young equestrian who is just starting out in the horse show world. She and Rusty have been working hard to improve their jumping and dressage skills, and Rachel is hoping to start competing at the regional level soon",
			img: "/assets/stories/pexels-bartosz-bartkowiak-3723103.jpg",
			alt: "a person riding a horse over a hurdle",
			id: 5,
		},
		{
			name: "Tom and his horse Shadow",
			about:
				"Tom is a trail rider who loves exploring the beautiful natural landscapes around his home. He and Shadow have gone on countless adventures together, and Tom says that Shadow is the perfect trail horse--steady, sure-footed, and always up for a challenge.",
			img: "/assets/stories/pexels-jaime-reimer-9899960.jpg",
			alt: "a person riding a horse in a river",
			id: 6,
		},
		{
			name: "Maya and her horse Apollo",
			about:
				"Maya is a horse lover who recently started taking riding lessons at a local stable. She and Apollo, one of the lesson horses, quickly bonded, and Maya now considers Apollo to be her best friend and confidante.",
			alt: "a person holding a child on top of a horse",
			img: "/assets/stories/pexels-efigie-lima-marcos-11831345.jpg",
			id: 7,
		},
		{
			name: "Hannah and her horse Blaze",
			about:
				"Hannah is a young girl who has always loved horses, and she finally convinced her parents to buy her one for her birthday. Blaze is a sweet and gentle mare, and Hannah is thrilled to have her as a companion and riding partner.",
			img: "/assets/stories/pexels-filip-kuran-6199403.jpg",
			alt: "a child lying on a pony",
			id: 8,
		},
		{
			name: "Marcus and his horse Ace",
			about:
				"Marcus is a professional trainer who works with high-level performance horses. Ace is one of his star pupils, a talented reining horse who has won numerous championships under Marcus's guidance.",
			img: "/assets/stories/pexels-ali-alcántara-14024300.jpg",
			alt: "a person riding a horse",
			id: 9,
		},
	];

	const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

	{
		/* Performs similarly to componentDidMount in classes */
	}
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
			<h1>Client Stories</h1>
			<div className="album py-5 highlight-color">
				<div className="s-container">
					<div
						className={`row row-cols-1 row-cols-sm-2 ${
							isMobile ? "row-cols-md-2" : "row-cols-md-3"
						} g-3`}
					>
						{clients?.map((client) => (
							<div className="col" key={client.id}>
								<div className="card shadow-sm">
									<img src={client.img} className="card-img-top" alt={client.alt} />
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
