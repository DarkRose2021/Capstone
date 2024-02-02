import React from "react";
import { Link } from "react-router-dom";

const DisplayUsers = ({ user, deleteUser }) => {
	return (
		<div key={user._id} className="user">
			<h3>Name: {user.Name}</h3>
			<h3>Email: {user.Email}</h3>
			<h3>
				Roles:{" "}
				{user.Roles?.map((role, index) => (
					<>{role}, </>
				))}
			</h3>
			<h3>Disabled: {user.Disabled ? "Yes" : "No"}</h3>

			<Link to={`/edit/${user._id}`}>
				<button>Edit Roles</button>
			</Link>
			<button onClick={() => deleteUser(user._id)}>
				{user.Disabled ? "Enable User" : "Disable User"}
			</button>
			{user.Roles?.includes("Client") ? (
				<Link to={`/editImages/${user._id}`}>
					<button>Edit Pictures</button>
				</Link>
			) : (
				<></>
			)}
			{user.Roles?.includes("Client") ? (
				<Link to={`/ShowImages/${user._id}`}>
					<button>Show Pictures</button>
				</Link>
			) : (
				<></>
			)}
		</div>
	);
};

export default DisplayUsers;
