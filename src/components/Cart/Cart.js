import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price * element.quantity;
    }
    let shiping = 0;
    if(total > 35){
        shiping = 0;
    }
    else if(total > 15){
        shiping = 4.99;
    }
    else if(total > 0){
        shiping = 12.99;
    }

    const tax = (total * 0.1).toFixed(2);
    const grandTotal = (Number(tax) + total + shiping).toFixed(2)
    return (
        <div>
            <div className="cart-style">
                <h3>This is Cart</h3>
                <p>Total Cart Item: {cart.length}</p>
                <p>Product Price: {total}</p>
                <p>Shiping Cost: {shiping}</p>
                <p>Tax & Vat: {tax}</p>
                <p>Total Cost: {grandTotal}</p>
                <br />
                <Link to="/review">
                    <button className="main-button">Review Order</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;