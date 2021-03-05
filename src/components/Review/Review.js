import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeCartItem = (cutItem) =>{
        // console.log('clicked', cutItem)
        const newCart = cart.filter(item => item.key !== cutItem)
        setCart(newCart)
        removeFromDatabaseCart(cutItem);
    }
    useEffect(() => {
      const savedCart =  getDatabaseCart()
      const productKeys = Object.keys(savedCart);
      const carts = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key )
           product.quantity = savedCart[key]
           return product; 
        })
        setCart(carts);
    }, [])
    return (
        <div className="twin-container">
            <div className="product-container">
                <h1 style={{textAlign: 'center'}}>Cart Items: {cart.length}</h1>
                {
                    cart.map(pd => 
                        <ReviewItems pd={pd} removeCartItem={removeCartItem} key={pd.key}>
                    </ReviewItems>)
                }
            </div>
            <div>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;