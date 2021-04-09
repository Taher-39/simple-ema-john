import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [searchResult, setSearchResult] = useState('')
    useEffect(() =>{
        fetch('https://dry-brushlands-16145.herokuapp.com/products?search=' + searchResult)
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    }, [searchResult])

    const handleSearch = event => {
        setSearchResult(event.target.value)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        fetch('https://dry-brushlands-16145.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data)
            })
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                <input type="text" placeholder='search-product' onBlur={handleSearch} className='form-control my-0 mx-auto mt-3 w-50'  />
                <div className="text-center py-2"><button className='btn btn-info'>Search</button></div>
                <hr/>
                {
                    products.map(pd => <Product 
                        productKey={false}
                        showAddToCart={true} product={pd} 
                        handleAddProduct={handleAddProduct} key={pd.key}>

                        </Product>)
                }
            </div>
            <div className="cart-container"> 
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="main-button">Review Order</button>
                        </Link>
                    </Cart>
            </div>       
            
        </div>
    );
};

export default Shop;