import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        };
        total = total + product.price*product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }
   
    // const total = cart.reduce((previous, Product) =>previous + Product.price, 0);
    let shipping = 0;
    if (total > 50) {
        shipping = 15;
    }
    const tax = (total + shipping) / 10;
    const grandTotal = total + shipping + tax;

    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered: {totalQuantity}</h5>
            <p>Total: {total.toFixed(2)}</p>
            <p>Shipping: {shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Total: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;