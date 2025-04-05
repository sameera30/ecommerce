import React, { useEffect, useState } from "react";
import axios from 'axios';
import './wishlist.css';
import { SERVER_API_URL } from "./Constant";

//done the seperate user fetching with the help of AI
export const Wishlist = ({ moveToCart }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const response = await axios.get(`${SERVER_API_URL}/wishlist`);
                setWishlistItems(response.data);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };

        fetchWishlistItems();
    }, []);

    const handleRemoveFromWishlist = async (id) => {
        try {
            await axios.delete(`${SERVER_API_URL}/wishlist/${id}`); 
            setWishlistItems((prev) => prev.filter((item) => item._id !== id)); 
        } catch (error) {
            console.error("Error removing item from wishlist:", error.response?.data || error.message);
        }
    };
    const handleMoveToCart = async (item) => {
        try {
            await moveToCart(item.product);
            await handleRemoveFromWishlist(item._id); 
        } catch (error) {
            console.error("Error moving item to cart:", error);
        }
    };

    return (
        <>
            <h1>Wishlist</h1>
            <div className="wishlist">
                {wishlistItems.length === 0 && <p>Your wishlist is empty.</p>}
                {wishlistItems.map((item) => (
                    <div key={item._id} className="wishlist-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div>
                            <h3>{item.product.name}</h3>
                            <p>{item.product.author}</p>
                            <p>${item.product.price?.toFixed(2) || "N/A"}</p>
                            <button className='wishlistButton' onClick={() => handleRemoveFromWishlist(item._id)}> Remove </button>
                            <button className='wishlistButton' onClick={() => handleMoveToCart(item)}> Move to Cart </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Wishlist;
