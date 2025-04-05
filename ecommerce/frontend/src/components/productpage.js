import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productpage.css';
import { SERVER_API_URL } from "./Constant";

const ProductPage = ({ addToCart }) => { 
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        axios.get(`${SERVER_API_URL}/products/${id}`)
            .then(response => {
                console.log("Fetched single product:", response.data);
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    const addToWishlist = async () => {
        try {
            const response = await axios.post(`${SERVER_API_URL}/wishlist/add`, { productId: id }); 
            setMessage(response.data.message);
            setTimeout(() => setMessage(null), 2000);
        } catch (error) {
            setMessage("Error adding to wishlist");
            console.error("Error adding to wishlist:", error.response ? error.response.data : error.message);
        }
    };
    
    const handleAddToCart = async () => {
        try {
            await addToCart(product); 
            setMessage("Product added to cart!");
            setTimeout(() => setMessage(null), 2000);
        } catch (error) {
            setMessage("Error adding to cart");
            console.error("Error adding to cart:", error);
        }
    };
    
    

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found.</p>;

        return (
            <div className="productpage">
                <img src={product.image} alt={product.name}/>
                <div className='prodpage'>
                <h1>{product.name}</h1>
                <h3>{product.author}</h3>
                <p>{product.description}</p>
                <p>${product.price ? product.price.toFixed(2) : "N/A"}</p></div>
                <button className="button" onClick={handleAddToCart}>Add to Cart</button> 
                <button className="button" onClick={addToWishlist}>Add to Wishlist</button>
                {message && <div className="popup">{message}</div>}
            </div>
        );
    };

export default ProductPage;
