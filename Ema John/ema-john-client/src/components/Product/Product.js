import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
const Product = (props) => {
  // console.log(props.product.key);
  const {img,name,seller,price,stock,key} = props.product;

  return (
    <div className="products-container">
      <div className="image-container">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <h3><Link to={"/product/"+key}>{name}</Link></h3>
        <p><small>by: {seller}</small></p>
        <p>${price}</p>
        <p><small>Only {stock} left in stock -- Order soon</small></p>
        {props.showAddToCart && <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to card
        </button>}
      </div>
    </div>
  );
};

export default Product;
