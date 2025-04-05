const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const productsRoute = require('./routes/products');
const wishlistRoute = require('./routes/wishlist');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user'); // Import the user route
const profileRoute = require('./routes/profile');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Serve static frontend files
app.use(express.static(path.join(__dirname, './../frontend/build')));

// API Routes
app.use('/api/products', productsRoute);
app.use('/api/wishlist', wishlistRoute);
app.use('/api/cart', cartRoute);
app.use('/api/users', userRoute); // Add user routes
app.use('/api/profile', profileRoute); 

// Catch-all handler for frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
