import React, { useState } from "react";

const Admin = () => {
	//logic to grab user data from database
	//put it in a list
	const [allUsers, setAllUsers] = useState([]);

	function listUsers() {
		fetch("http://localhost:5000/listUsers")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAllUsers(result);
			});
	}

	function listClients() {
		fetch("http://localhost:5000/listClients")
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAllUsers(result);
			});
	}

	return (
		<div className="admincontainer">
			<div>
				<div className="adminbtns">
					<div>
						<button onClick={listClients}>List Clients</button>
						<button onClick={listUsers}>List Users</button>
						<button>Edit Clients</button>
						<button>Add Clients</button>
					</div>
				</div>
				{/* show the clients when either button is clicked (might change to showing clients by default)*/}
				{/* when client is clicked it'll bring up their "page" ie, their images */}
				{/* options for admin to add or delete imgs from the client's page */}
				{allUsers.length > 0 ? (
					allUsers.map((user) => (
						<div key={user._id}>
							<h3>Name: {user.Name}</h3>
							<h3>Email: {user.Email}</h3>
							<h3>
								Roles:{" "}
								{user.Roles?.map((role, index) => (
									<>{role}, </>
								))}
							</h3>

							<button>Edit Roles</button>
							{user.Roles?.includes("Client") ? (<button>Edit Pictures</button>):(<></>)}
							
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Admin;
