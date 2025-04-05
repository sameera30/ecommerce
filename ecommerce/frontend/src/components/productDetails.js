import React from 'react';
import { Link } from 'react-router-dom';
const ProductDetails = ({ product }) => {
    return (
        <div className="productDetails">
            <img 
                src={product.image } 
                alt={product.name}
                className="productImage"
            />
            <h3>{product.name}</h3>
            <p>{product.author}</p>
            <p>${product.price.toFixed(2)}</p>
            <Link to={`/product/${product._id}`} className="viewButton">View</Link>
        </div>
    );
};

export default ProductDetails;
