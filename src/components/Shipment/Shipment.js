import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [shipmentData, setShipmentData] = useState(null);
    const onSubmit = data =>{
        setShipmentData(data)
        // console.log('shipmentData: ',data);
        };
    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser,
             products: savedCart,
            shipment: shipmentData,
            paymentId,
            orderTime: new Date() 
            };

        fetch('https://dry-brushlands-16145.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('your order placed successfully');
                }
            })
    }    

    return (
        <div className="row container">
            <div style={{ display: shipmentData ? "none" : "block"}} className="col-md-6">
                < form className="ship-from" onSubmit={handleSubmit(onSubmit)} >
                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name" />
                    {errors.name && <span className="error">Name is required</span>}

                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="your email" />
                    {errors.email && <span className="error">Email is required</span>}

                    < input name="address" ref={register({ required: true })} placeholder="your address" />
                    {errors.address && <span className="error">Address is required</span>}

                    < input name="phone" ref={register({ required: true })} placeholder="your phone" />
                    {errors.phone && <span className="error">phone is required</span>}
                    <input type="submit" />
                </form >
            </div>
            <div style={{ display: shipmentData ? "block" : "none" }} className="col-md-6">
                <h3>Process Payment</h3>
                <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;