const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

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

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [{ productId, quantity: 1 }] });
        } else {
            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate({
            path: 'products.productId',
            select: 'name author price image',
        });

        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ message: "Cart is empty", products: [] });
        }

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/increase/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(item => item.productId.toString() === id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
            await cart.save();
            res.json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/decrease/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(item => item.productId.toString() === id);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = Math.max(1, cart.products[productIndex].quantity - 1);
            await cart.save();
            res.json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== id);
        await cart.save();

        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
