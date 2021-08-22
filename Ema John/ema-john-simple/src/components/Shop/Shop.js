import React, { useEffect, useState } from "react";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import './Shop.css';
import { Link } from "react-router-dom";
const Shop = () => {
  // const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/products')
    .then(res=>res.json())
    .then(data=>setProducts(data))
  },[])
  useEffect(()=>{
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch('http://localhost:5000/productsByKeys',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data => setCart(data))
  },[])
  const handleAddProduct = (product)=>{
      // console.log('cliked',product);
      const toBeAddedKey = product.key;
      const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
      let count = 1;
      let newCart;
      if(sameProduct){
        count = sameProduct.quantity + 1;
        sameProduct.quantity = sameProduct.quantity + count;
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others,sameProduct];
      }
      else{
        product.quantity=1;
        newCart=[...cart,product];
      }
      
      setCart(newCart);
      
      addToDatabaseCart(product.key,count);
  }
  // console.log(fakeData);
  return (
    <div className="twin-container">
      <div className="product-container">
        {
          products.length === 0 && <p>loading....</p>
        }
        {
            products.map(product => <Product showAddToCart={true} key={product.key} handleAddProduct={handleAddProduct} product={product} key={product.key}></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button" style={{color:'black'}}>Review Order</button>
          </Link>
        </Cart>
        
      </div>
    </div>
  );
};

export default Shop;
