const express = require('express');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const router = express.Router();

//done with the help of AI
router.post('/add', async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingWishlistItem = await Wishlist.findOne({ product: productId });
        if (existingWishlistItem) {
            return res.status(400).json({ message: "Product is already in the wishlist" });
        }

        const wishlistItem = new Wishlist({ product: productId });
        await wishlistItem.save();
        res.status(201).json({ message: "Product added to wishlist", wishlistItem });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find().populate('product', 'name author price image');
        res.json(wishlistItems);
    } catch (error) {
        console.error("Error fetching wishlist items:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let deletedItem = await Wishlist.findByIdAndDelete(id);
        if (!deletedItem) {
            deletedItem = await Wishlist.findOneAndDelete({ product: id });
        }

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Error removing item from wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
