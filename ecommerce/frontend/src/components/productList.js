import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './productDetails'; 
import './productlist.css';
import { SERVER_API_URL } from "./Constant";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_API_URL}/products`)
            .then(response => {
                console.log("Fetched products:", response.data); 
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="productlist">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductDetails key={product._id} product={product} />
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
