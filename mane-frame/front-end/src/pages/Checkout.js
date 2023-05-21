import React from "react";

const Checkout = () => {
	return (
		<div className="checkout">
			<h1>Checkout</h1>
			<div className="container">
				<div>
					<div className="shipaddressform">
						<h2>Shipping Address</h2>
						<form>
							<label htmlFor="name">Full Name:</label> <br />
							<input type="text" id="name" name="name" required />
							<br />
							<label htmlFor="address">Street address:</label>
							<br />
							<input type="text" id="address" name="address" required />
							<br />
							<label htmlFor="address 2">Apt, Suite, etc (optional)</label>
							<br />
							<input type="text" id="address2" name="address2" />
							<br />
							<label htmlFor="city">City:</label>
							<br />
							<input type="text" id="city" name="city" required />
							<br />
							<label htmlFor="state">State:</label>
							<br />
							<input type="text" id="state" name="state" required />
							<br />
							<label htmlFor="zip">ZIP Code:</label>
							<br />
							<input type="text" id="zip" name="zip" required />
							<br />
							<label htmlFor="country">Country:</label>
							<br />
							<select id="country" name="country" required>
								<option value="">Select Country</option>
								<option value="USA">United States</option>
								<option value="Canada">Canada</option>
							</select>
							<br />
							<div className="checkbox">
								<input
									type="checkbox"
									id="sameaddress"
									name="sameaddress"
									value="True"
								/>
								<label htmlFor="sameaddress">
									Billing address is the same as Shipping Address
								</label>
								<br />
							</div>
							<button type="submit">Submit</button>
						</form>
					</div>
					<div className="billaddress">
						<h2>Billing Address</h2>
						<form>
							<label htmlFor="name">Full Name:</label> <br />
							<input
								className="focus-ring"
								type="text"
								id="name"
								name="name"
								required
							/>
							<br />
							<label htmlFor="address">Street address:</label>
							<br />
							<input type="text" id="address" name="address" required />
							<br />
							<label htmlFor="address 2">Apt, Suite, etc (optional)</label>
							<br />
							<input type="text" id="address2" name="address2" />
							<br />
							<label htmlFor="city">City:</label>
							<br />
							<input type="text" id="city" name="city" required />
							<br />
							<label htmlFor="state">State:</label>
							<br />
							<input type="text" id="state" name="state" required />
							<br />
							<label htmlFor="zip">ZIP Code:</label>
							<br />
							<input type="text" id="zip" name="zip" required />
							<br />
							<label htmlFor="country">Country:</label>
							<br />
							<select id="country" name="country" required>
								<option value="">Select Country</option>
								<option value="USA">United States</option>
								<option value="Canada">Canada</option>
							</select>
							<br />
							<button type="submit">Submit</button>
						</form>
					</div>
					<div className="cardInfo">
						<h2>Card Information</h2>
						<form>
							<label htmlFor="name">Name on card:</label> <br />
							<input type="text" id="name" name="name" required />
							<br />
							<label htmlFor="cardnum">Card number:</label>
							<br />
							<input type="number" id="cardnum" name="cardnum" required />
							<br />
							<label htmlFor="cvc">CVC:</label>
							<br />
							<input type="number" id="cvc" name="cvc" required />
							<br />
							<label htmlFor="exp">Exp. date:</label>
							<br />
							<input type="number" id="exp" name="exp" required />
							<br />
							<button type="submit">Submit</button>
						</form>
					</div>
				</div>
				<div>
					<h2>Order Summary</h2>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
