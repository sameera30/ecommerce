const mongoose = require('mongoose');
//done with the help of AI
const wishlistSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
