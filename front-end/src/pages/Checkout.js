import React from "react";

const Checkout = () => {
	// Form is from Bootstrap
	(function () {
		"use strict";

		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll(".needs-validation");

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms).forEach(function (form) {
			form.addEventListener(
				"submit",
				function (event) {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}

					form.classList.add("was-validated");
				},
				false
			);
		});
	})();
	// add logic for shipping address to show or hide if the checkmark is clicked
	return (
		// add shipping address form
		<div class="container">
			<main>
				<div class="py-5 text-center">
					<h2>Checkout</h2>
				</div>

				<div class="row g-5 checkoutform">
					<div class="col-md-5 col-lg-4 order-md-last">
						<h4 class="d-flex justify-content-between align-items-center mb-3">
							<span class="">Your cart</span>
							<span class="badge bg-primary rounded-pill">3</span>
						</h4>
						<ul class="list-group mb-3">
							<li class="list-group-item d-flex justify-content-between lh-sm">
								<div>
									<h6 class="my-0">Product name</h6>
									<small class="text-muted">Brief description</small>
								</div>
								<span class="text-muted">$12</span>
							</li>
							<li class="list-group-item d-flex justify-content-between lh-sm">
								<div>
									<h6 class="my-0">Second product</h6>
									<small class="text-muted">Brief description</small>
								</div>
								<span class="text-muted">$8</span>
							</li>
							<li class="list-group-item d-flex justify-content-between lh-sm">
								<div>
									<h6 class="my-0">Third item</h6>
									<small class="text-muted">Brief description</small>
								</div>
								<span class="text-muted">$5</span>
							</li>
							<li class="list-group-item d-flex justify-content-between">
								<span>Total (USD)</span>
								<strong>$20</strong>
							</li>
						</ul>

					</div>
					<div class="col-md-7 col-lg-8">
						<h4 class="mb-3">Billing address</h4>
						<form class="needs-validation" noValidate>
							<div class="row g-3">
								<div class="col-sm-6">
									<label for="firstName" class="form-label">
										First name
									</label>
									<input
										type="text"
										class="form-control"
										id="firstName"
										placeholder=""
										value=""
										required
									/>
									<div class="invalid-feedback">
										Valid first name is required.
									</div>
								</div>

								<div class="col-sm-6">
									<label for="lastName" class="form-label">
										Last name
									</label>
									<input
										type="text"
										class="form-control"
										id="lastName"
										placeholder=""
										value=""
										required
									/>
									<div class="invalid-feedback">
										Valid last name is required.
									</div>
								</div>

								<div class="col-12">
									<label for="email" class="form-label">
										Email <span class="text-muted">(Optional)</span>
									</label>
									<input
										type="email"
										class="form-control"
										id="email"
										placeholder="you@example.com"
									/>
									<div class="invalid-feedback">
										Please enter a valid email address for shipping updates.
									</div>
								</div>

								<div class="col-12">
									<label for="address" class="form-label">
										Address
									</label>
									<input
										type="text"
										class="form-control"
										id="address"
										placeholder="1234 Main St"
										required
									/>
									<div class="invalid-feedback">
										Please enter your shipping address.
									</div>
								</div>

								<div class="col-12">
									<label for="address2" class="form-label">
										Address 2 <span class="text-muted">(Optional)</span>
									</label>
									<input
										type="text"
										class="form-control"
										id="address2"
										placeholder="Apartment or suite"
									/>
								</div>

								<div class="col-md-5">
									<label for="country" class="form-label">
										Country
									</label>
									<select class="form-select" id="country" required>
										<option value="">Choose...</option>
										<option>United States</option>
									</select>
									<div class="invalid-feedback">
										Please select a valid country.
									</div>
								</div>

								<div class="col-md-4">
									<label for="state" class="form-label">
										State
									</label>
									<select class="form-select" id="state" required>
										<option value="">Choose...</option>
										<option>California</option>
									</select>
									<div class="invalid-feedback">
										Please provide a valid state.
									</div>
								</div>

								<div class="col-md-3">
									<label for="zip" class="form-label">
										Zip
									</label>
									<input
										type="text"
										class="form-control"
										id="zip"
										placeholder=""
										required
									/>
									<div class="invalid-feedback">Zip code required.</div>
								</div>
							</div>

							<hr class="my-4" />

							<div class="form-check">
								<input
									type="checkbox"
									class="form-check-input"
									id="same-address"
								/>
								<label class="form-check-label" for="same-address">
									Shipping address is the same as my billing address
								</label>
							</div>

							<hr class="my-4" />

							<h4 class="mb-3">Payment</h4>

							<div class="my-3">
								<div class="form-check">
									<input
										id="credit"
										name="paymentMethod"
										type="radio"
										class="form-check-input"
										checked
										required
									/>
									<label class="form-check-label" for="credit">
										Credit card
									</label>
								</div>
								<div class="form-check">
									<input
										id="debit"
										name="paymentMethod"
										type="radio"
										class="form-check-input"
										required
									/>
									<label class="form-check-label" for="debit">
										Debit card
									</label>
								</div>
							</div>

							<div class="row gy-3">
								<div class="col-md-6">
									<label for="cc-name" class="form-label">
										Name on card
									</label>
									<input
										type="text"
										class="form-control"
										id="cc-name"
										placeholder=""
										required
									/>
									<small class="text-muted">
										Full name as displayed on card
									</small>
									<div class="invalid-feedback">Name on card is required</div>
								</div>

								<div class="col-md-6">
									<label for="cc-number" class="form-label">
										Credit card number
									</label>
									<input
										type="text"
										class="form-control"
										id="cc-number"
										placeholder=""
										required
									/>
									<div class="invalid-feedback">
										Credit card number is required
									</div>
								</div>

								<div class="col-md-3">
									<label for="cc-expiration" class="form-label">
										Expiration
									</label>
									<input
										type="text"
										class="form-control"
										id="cc-expiration"
										placeholder=""
										required
									/>
									<div class="invalid-feedback">Expiration date required</div>
								</div>

								<div class="col-md-3">
									<label for="cc-cvv" class="form-label">
										CVV
									</label>
									<input
										type="text"
										class="form-control"
										id="cc-cvv"
										placeholder=""
										required
									/>
									<div class="invalid-feedback">Security code required</div>
								</div>
							</div>

							<hr class="my-4" />

							<button class="w-100 btn btn-primary btn-lg" type="submit">
								Continue to checkout
							</button>
						</form>
					</div>
				</div>
			</main>
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
};

export default Checkout;
