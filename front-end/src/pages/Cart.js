import React from 'react'

const Cart = () => {
  return (
    <div className='container'>
      <main>
				<div class="py-5 text-center">
					<h2>Cart</h2>
				</div>

				<div class="row g-5 cart">
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
					</div>
          </main>
    </div>
  )
}

export default Cart