import React, { useEffect, useState } from 'react';
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
    }
    const removeCartItem = (cutItem) =>{
        const newCart = cart.filter(item => item.key !== cutItem)
        setCart(newCart)
        removeFromDatabaseCart(cutItem);
    }
    useEffect(() => {
      const savedCart =  getDatabaseCart()
      const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(productKeys)
      })
      .then(res => res.json())
      .then(data => {
          setCart(data)
      })
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