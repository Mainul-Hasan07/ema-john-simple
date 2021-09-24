import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts,setDisplayProducts] = useState([]);

    useEffect(() => {
        // console.log('called api');
        fetch('./products.json')
        .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
                // console.log('Products Received');
            })
    }, [])

    useEffect(() => {
        // console.log('Local Storage called')
        const savedCart = getStoredCart();
        const storedCart = [];
        if (products.length) {
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
                
            }
            setCart(storedCart);
        }
    },[products])
   

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        //save to local storage
        addToDb(product.key);
    }
 
    const handleSearch = (event) => {
        const searchText = event.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        setDisplayProducts(matchProducts);
        
    }

    return (
        <>
            <div className='search-container'>
                <input type="text" onChange={handleSearch} placeholder='search product' />
            </div>
            <div className='shop-container'>
            <div className="product-container">
                {
                    displayProducts.map(product => <Product
                        key={product.key}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    >
                    </Product>)
                }
           </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
        </>
    );
};

export default Shop;