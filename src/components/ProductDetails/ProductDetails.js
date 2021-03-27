import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { ProductKey } = useParams();
    const [product, setProduct] = useState({})
    useEffect(() =>{
        fetch(`http://localhost:5000/product/${ProductKey}`)
        .then(res => res.json())
        .then( data => {
            setProduct(data[0])
        })
    }, [ProductKey])

    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} productKey={true} product={product}></Product>
        </div>
    );
};

export default ProductDetails;