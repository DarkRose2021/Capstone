import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";

const Confirm = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);

  const {state} = useLocation();
  // console.log(state.data.firstname)

  useEffect(() => {
		const handleStorage = () => {
			if (localStorage.length > 0) {
				setLoggedIn(true);
				setRoles(localStorage.getItem("Roles"));
			}
		};

		window.addEventListener("storage", handleStorage());
		return () => window.removeEventListener("storage", handleStorage());
	}, []);
  
  return (
    <div>
      {roles?.includes("Admin") || roles?.includes("Client") ? (
				<>
        <h1>Order Confirm</h1>
        </>
        ) : (
          <>
            <h1>You don't have permission to view this page</h1>
            {/* <Navigate to={"/login"} /> */}
          </>
        )}
    </div>
  )
}

export default Confirm