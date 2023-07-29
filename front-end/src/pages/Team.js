import React from "react";

const Team = () => {
	const team = [
		{
			name: "Emily Zhang",
			position: "Lead Photographer",
			txt: "Emily is an accomplished equine photographer with over a decade of experience. She has a keen eye for detail and a natural talent for capturing the unique personalities of each horse she photographs. Emily is passionate about creating stunning images that tell a story and evoke a deep emotional connection with viewers.",
			img: "/assets/Emily Zhang.jpg",
		},
		{
			name: "Jack Reynolds",
			position: "Videographer",
			txt: "Jack is a talented videographer who specializes in capturing horses in motion. With years of experience in the equine industry, Jack has a deep understanding of the movement and behavior of horses, which allows him to create captivating videos that showcase the grace and power of these magnificent animals.",
			img: "/assets/Jack Reynolds.jpg",
		},
		{
			name: "Sarah Jones",
			position: "Assistant Photographer",
			txt: "Sarah is a skilled photographer who provides valuable support to the lead photographers at Mane Frame. She has a natural talent for composition and lighting and is dedicated to ensuring that each photo session runs smoothly and efficiently. Sarah is also an experienced horse handler, which allows her to work closely with the horses to get the best shots possible.",
			img: "/assets/Sarah Jones.jpg",
		},
		{
			name: "John Doe",
			position: "Marketing Manager",
			txt: "John is responsible for promoting Mane Frame Photography and expanding our reach to new clients. With a background in marketing and a passion for horses, John is adept at creating compelling campaigns that resonate with our target audience. He is also an expert at social media marketing, which helps us to connect with horse lovers all around the world.",
			img: "/assets/John Lee.jpg",
		},
		{
			name: "Rachel Kim",
			position: "Customer Service Representative",
			txt: "Rachel is our friendly and knowledgeable customer service representative who is dedicated to ensuring that each client has a positive experience with Mane Frame Photography. With a deep understanding of our services and a passion for horses, Rachel is always available to answer questions, address concerns, and provide guidance throughout the photography process.",
			img: "/assets/Rachel Kim.jpg",
		},
	];
	return (
		<div className="team">
			<h1>Meet the Team!</h1>
			<div>
				{team?.map((person) => (
					<div key={person.name} className="teammember">
						<div className="name">
							<h2>{person.name}</h2>
							<h3>{person.position}</h3>
						</div>
						<div className="info">
							<img src={person.img} alt="" />
							<p>{person.txt}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Team;
