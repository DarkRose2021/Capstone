import React from 'react'

const CartTotal = ({ cart, products }) => (
    <li className="list-group-item d-flex justify-content-between total">
      <span>Total (USD)</span>
      <strong>${calculateTotal(cart, products)}</strong>
    </li>
  );

export default CartTotal