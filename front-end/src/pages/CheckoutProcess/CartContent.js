import React from "react";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const CartContent = () => {
	return (
		<div className="row g-5 ">
			<div>
				<h1 className="mb-3 cartPg">Your cart</h1>
				{msg ? <h2>{msg}</h2> : <></>}
				<ul className="list-group mb-3 cart">
					{cart ? (
						products?.map((product) => (
							<CartItem
								key={product._id}
                                cart={cart}
								product={product}
								updateQty={updateQty}
								deleteItem={deleteItem}
							/>
						))
					) : (
						<></>
					)}
					<CartTotal cart={cart} products={products} />
				</ul>
				<div className="checkoutBtn">
					<Link to={"/checkout"} className="btn">
						<button>Proceed to Checkout</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CartContent;
