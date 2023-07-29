import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";

const Confirm = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
	const [roles, setRoles] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const {state} = useLocation();
  // console.log(state)

  useEffect(() => {
    // Function to update the date every second (optional)
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getLastFourDigits = (cardNumber) => {
    // Check if cardNumber is valid and has at least 4 characters
    if (cardNumber && cardNumber.length >= 4) {
      return cardNumber.slice(-4); // Get the last 4 characters
    }
    return '****'; // Return default if card number is invalid
  };

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
        <h1>Your Order has been confirmed!</h1>
        <div className="order-con">
          <div className="order">
            <h3>Hi {state.data.firstName}!</h3>
            <p>Your order has been confirmed and will be shipped soon</p>
            <hr />
            <div className="orderInfo">
              <div>
                <h4>Order date</h4>
                <p>{formattedDate}</p>
              </div>
              <div>
                <h4>Order ID</h4>
                <p>ORD202307273GPT3</p>
              </div>
              <div>
                <h4>Payment</h4>
                <p>**** **** **** {getLastFourDigits(state.data.ccNumber)}</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>{state.data.address}</p>
              </div>
            </div>
            <hr />
            <div>
              {/* products */}
            </div>
            <div>
              <div>
                {/* prices */}
              </div>
            </div>
            <hr />
            <div>
              <div>
                {/* total */}
              </div>
            </div>
            <hr />
            <div>
              We'll send you a shipping confirmation when your order ships! Thank you for your purchase!<br />
              <b>Thank You!</b><br />
              Mane Frame Photography
            </div>
          </div>
        </div>
        
          
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