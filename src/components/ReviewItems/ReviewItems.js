import React from 'react';

const ReviewItems = (props) => {
    // console.log(props)
    const {name, quantity, img, key, price} = props.pd;
    return (
        <div className="product">
            <div><img src={img} /></div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p>Quantity: {quantity}</p>
                <p>Price: {price}</p>
                <button className="main-button" onClick={() =>
                    props.removeCartItem(key)}>Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewItems;