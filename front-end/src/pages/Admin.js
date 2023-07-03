import React from "react";

const Admin = () => {
	//logic to grab user data from database
	//put it in a list
	return (
		<div className="admincontainer">
			<div>
				<div className="adminbtns">
					<div>
						<button>List Clients</button>
						<button>Edit Client Pictures</button>
					</div>
				</div>
				{/* show the clients when either button is clicked (might change to showing clients by default)*/}
				{/* when client is clicked it'll bring up their "page" ie, their images */}
				{/* options for admin to add or delete imgs from the client's page */}
			</div>
		</div>
	);
};

export default Admin;
