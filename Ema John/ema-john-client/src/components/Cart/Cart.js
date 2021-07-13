import React from "react";


const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12;
  }
  const tax = (total / 10).toFixed(2);
  const TotalPrice = (total + shipping + Number(tax)).toFixed(3);
  const formatNumber = (num) => {
    const pre = num.toFixed(2);
    return Number(pre);
  };
  return (
    <div>
      <h3>Order Summary</h3>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price : {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost : {shipping}</small>
      </p>
      <p>
        <small></small>Tax + VAT {tax}
      </p>
      <p>Product Price : {TotalPrice}</p>
      <br />
      {
        props.children
      }
    </div>
  );
};

export default Cart;
