import React, { useState } from 'react';
import '../../fakeData';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([])
    const handleAddProduct = (product) => {
        const newState = [...cart, product]
        setCart(newState)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product product={pd} handleAddProduct={handleAddProduct} key={pd.key}></Product>)
                }
            </div>
            <div className="cart-container"> 
                    <Cart cart={cart}></Cart>
            </div>       
            
        </div>
    );
};

export default Shop;