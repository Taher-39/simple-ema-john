import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeCgTHYjILdsZY2FPLWUK2bN32m4A2znYloUXwkNzWzPsqldA6KcFEO1xOyYbZATHeuzFJyBrGv5Uvvc3MARJeQ00oHYlm0bq');

const ProcessPayment = ({ handlePayment }) => {
    return (
            <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
                {/* <SplitCardForm></SplitCardForm> */}
            </Elements>
    );
};

export default ProcessPayment;