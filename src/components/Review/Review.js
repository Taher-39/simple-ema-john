import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();
    const handleCheckOut = () => {
        history.push('/shipment')
        // setCart([])
        // setOrderPlaced(true)
        // processOrder()
    }
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
    }, []);
    let thanks;
    if (orderPlaced){
        thanks = <img src={happyImg} />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                
                {
                    cart.map(pd => 
                        <ReviewItems pd={pd} removeCartItem={removeCartItem} key={pd.key}>
                    </ReviewItems>)
                }
                {thanks}
            </div>
            <div>
                <Cart cart={cart}>
                    <button onClick={handleCheckOut} className="main-button">Process CheckOut</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;