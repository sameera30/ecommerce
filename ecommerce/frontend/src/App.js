import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Cart } from './components/cart';
import { Wishlist } from './components/wishList';  
import ProductList from './components/productList';
import React, { useState, useEffect } from 'react';
import ProductPage from './components/productpage';
import { SERVER_API_URL } from './components/Constant';
import axios from 'axios';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import PrivateRoute from './components/privateRoute';

////done with the help of AI useEffect 
const App = () => {
  const [booksInTheCart, setCartItems] = useState([]);
  const [booksInTheWishlist, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/cart`); 
            setCartItems(response.data.products); 
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    fetchCartItems(); 
  }, []);

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

   const addToCart = async (product) => {
    try {
      await axios.post(`${SERVER_API_URL}/cart/add`, { productId: product._id }); 
      setCartItems(prev => [...prev, product]); 
    } catch (error) {
      console.error("Error adding to cart:", error); 
    }
  };

  const addToWishlist = async (product) => {
    if (!booksInTheWishlist.find((book) => book._id === product._id)) {
      try {
        await axios.post(`${SERVER_API_URL}/wishlist/add`, { productId: product._id }); 
        setWishlistItems(prev => [...prev, product]); 
      } catch (error) {
        console.error("Error adding to wishlist:", error); 
      }
    }
  };


  const removeFromWishlist = async (wishlistItemId) => {
    try {
        console.log("Removing wishlist item ID:", wishlistItemId); 
        await axios.delete(`${SERVER_API_URL}/wishlist/${wishlistItemId}`); 
        setWishlistItems((prev) => prev.filter((item) => item._id !== wishlistItemId)); 
    } catch (error) {
        console.error("Error removing from wishlist:", error.response?.data || error.message);
    }
};



  
  const moveToCart = async (product) => {
    try {
      await addToCart(product); 
      await removeFromWishlist(product._id); 
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

const removeFromCart = async (id) => {
  try {
      await axios.delete(`${SERVER_API_URL}/cart/${id}`); 
      setCartItems((prev) => prev.filter((book) => book._id !== id)); 
  } catch (error) {
      console.error("Error removing from cart:", error);
  }
};

const moveToWishlist = async (product) => {
  try {
      await axios.post(`${SERVER_API_URL}/wishlist/add`, { productId: product._id });
      setWishlistItems((prevWishlist) => [...prevWishlist, product]);
      await axios.delete(`${SERVER_API_URL}/cart/${product._id}`);

      setCartItems((prevCart) => prevCart.filter((item) => item._id !== product._id));
  } catch (error) {
      console.error("Error moving item to wishlist:", error);
  }
};



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route
    path="/product/:id"
    element={
        <PrivateRoute>
            <ProductPage addToCart={addToCart} addToWishlist={addToWishlist} />
        </PrivateRoute>
    }
/>  
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart booksInTheCart={booksInTheCart} removeFromCart={removeFromCart} moveToWishlist={moveToWishlist} setCartItems={setCartItems} />} />
          <Route path="/wishlist" element={<Wishlist booksInTheWishlist={booksInTheWishlist} removeFromWishlist={removeFromWishlist} moveToCart={moveToCart} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;