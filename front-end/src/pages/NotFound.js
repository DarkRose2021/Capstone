import React from "react";

const NotFound = () => {
	return (
		<div className="errorpg">
			<div>
				<img src="/assets/error1.jpg" alt="a horse looking over a wall" width={400} />
			</div>
			<div>
				<h1>404 Page Not found!</h1>
				<a href="mailto:kking@student.neumont.edu">
					Contact us about this error
				</a>
			</div>
		</div>
	);
};

export default NotFound;
