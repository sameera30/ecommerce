import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cart.css";
import { SERVER_API_URL } from "./Constant";

//done the seperate user fetching with the help of AI
export const Cart = ({ setCartItems, moveToWishlist }) => {
    const [cartItems, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/cart`);
            const products = response.data.products.map((product) => ({
                ...product.productId,
                quantity: product.quantity
            }));
            setCart(products); 
            setQuantities(
                products.reduce((acc, product) => {
                    acc[product._id] = product.quantity;
                    return acc;
                }, {})
            );
        } catch (error) {
            console.error("Error fetching in the cart:", error);
        }
    };

    const handleIncrease = async (id) => {
        try {
            await axios.put(`${SERVER_API_URL}/cart/increase/${id}`);
            fetchCartData(); 
        } catch (error) {
            console.error("Error increasing the quantity in the cart:", error);
        }
    };

    const handleDecrease = async (id) => {
        try {
            await axios.put(`${SERVER_API_URL}/cart/decrease/${id}`);
            fetchCartData();
        } catch (error) {
            console.error("Error decreasing quantity in the cart :", error);
        }
    };

    const handleRemove = async (id) => {
        const confirmation = window.confirm("Are you sure you want to remove this item?");
        if (!confirmation) return;

        try {
            await axios.delete(`${SERVER_API_URL}/cart/${id}`);
            fetchCartData(); 
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleMoveToWishlist = async (item) => {
        try {
            await moveToWishlist(item);

            setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id));
        } catch (error) {
            console.error("Error moving item to wishlist:", error);
        }
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + (item.price || 0) * (quantities[item._id] || 0),
        0
    );

    return (
        <>
            <h1>Cart</h1>
            <div className="cart">
                {cartItems.length === 0 && <p>Your cart is empty</p>}
                {cartItems.map((item) => (
                    <div className="cart-item" key={item._id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price ? item.price.toFixed(2) : "N/A"}</p>
                            <div>
                                <button className="cartbutton1" onClick={() => handleDecrease(item._id)} > - </button>
                                <span>{quantities[item._id]}</span>
                                <button className="cartbutton1" onClick={() => handleIncrease(item._id)} > + </button>
                            </div>
                        </div>
                        <div>
                            <button className="cartbutton" onClick={() => handleRemove(item._id)} > Remove from cart </button>
                            <button className="cartbutton" onClick={() => handleMoveToWishlist(item)} >Move to Wishlist</button>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className="total-button">Proceed to Checkout</button>
        </>
    );
};
