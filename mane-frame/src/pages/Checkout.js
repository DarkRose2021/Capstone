import React from "react";

const Checkout = () => {
	return (
		<div className="checkout">
      <h1>Checkout</h1>
			<div className="container">
				<div className="shipaddressform">
          <h2>Shipping Address</h2>
					<form>
						<label for="name">Full Name:</label> <br />
						<input type="text" id="name" name="name" required /><br />

						<label for="address">Street address:</label><br />
						<input type="text" id="address" name="address" required /><br />

            <label for="address 2">Apt, Suite, etc (optional)</label><br />
						<input type="text" id="address2" name="address2"  /><br />

						<label for="city">City:</label><br />
						<input type="text" id="city" name="city" required /><br />

						<label for="state">State:</label><br />
						<input type="text" id="state" name="state" required /><br />

						<label for="zip">ZIP Code:</label><br />
						<input type="text" id="zip" name="zip" required /><br />

						<label for="country">Country:</label><br />
						<select id="country" name="country" required>
							<option value="">Select Country</option>
							<option value="USA">United States</option>
							<option value="Canada">Canada</option>
						</select><br />

						<button type="submit">Submit</button>
					</form>
          <input type="checkbox" id="sameaddress" name="sameaddress" value="True" />
          <label for="sameaddress">Billing address is the same as Shipping Address</label>
				</div>
        <div className="billaddress">
          <h2>Billing Address</h2>
        <form>
						<label for="name">Full Name:</label> <br />
						<input type="text" id="name" name="name" required /><br />

						<label for="address">Street address:</label><br />
						<input type="text" id="address" name="address" required /><br />

            <label for="address 2">Apt, Suite, etc (optional)</label><br />
						<input type="text" id="address2" name="address2"  /><br />

						<label for="city">City:</label><br />
						<input type="text" id="city" name="city" required /><br />

						<label for="state">State:</label><br />
						<input type="text" id="state" name="state" required /><br />

						<label for="zip">ZIP Code:</label><br />
						<input type="text" id="zip" name="zip" required /><br />

						<label for="country">Country:</label><br />
						<select id="country" name="country" required>
							<option value="">Select Country</option>
							<option value="USA">United States</option>
							<option value="Canada">Canada</option>
						</select><br />

						<button type="submit">Submit</button>
					</form>
        </div>
        <div className="cardInfo">
          <h2>Card Information</h2>
        <form>
						<label for="name">Name on card:</label> <br />
						<input type="text" id="name" name="name" required /><br />

						<label for="cardnum">Card number:</label><br />
						<input type="number" id="cardnum" name="cardnum" required /><br />

						<label for="cvc">CVC:</label><br />
						<input type="number" id="cvc" name="cvc" required /><br />

						<label for="exp">Exp. date:</label><br />
						<input type="number" id="exp" name="exp" required /><br />

						<button type="submit">Submit</button>
					</form>
        </div>
			</div>
		</div>
	);
};

export default Checkout;
