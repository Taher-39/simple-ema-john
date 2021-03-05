import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img}  alt="" />
            </div>
            <div>
                <h3 className="product-name"><Link to={'/product/'+key}>{name}</Link></h3>
                <br />
                <p>By: <small>{seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>
                {props.productKey && <h3>This Product Key: {key}</h3>}
                
                { props.showAddToCart && <button className="main-button" onClick={() =>
                    props.handleAddProduct(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart} /> 
                    Add To Cart</button>}
            </div>
           
        </div>
    );
};

export default Product;