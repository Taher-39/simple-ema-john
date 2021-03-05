import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { ProductKey } = useParams();
    const product = fakeData.find(pd => pd.key === ProductKey);
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} productKey={true} product={product}></Product>
        </div>
    );
};

export default ProductDetails;