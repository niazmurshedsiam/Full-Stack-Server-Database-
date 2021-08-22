import React from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import { useEffect, useState } from "react";

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+ productKey)
        .then(res=>res.json())
        .then(data=> setProduct(data))
        
    },[productKey])
    
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Product Detail</h1>
            <hr />
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;