const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model');
const isLoggedin = require('../middlewares/isLoggedin');

router.post("/", isLoggedin, async (req, res) => {
  try {
    // Populate cart items with product details
    const user = await userModel.findOne({ email: req.user.email })
      .populate('cart.product');
    
    // Filter out any null/undefined products from cart
    const validCartItems = user.cart.filter(item => item.product);
    
    // Check if cart is empty after filtering
    if (!validCartItems || validCartItems.length === 0) {
      req.flash("error", "Your cart is empty or contains invalid items");
      return res.redirect('/cart');
    }

    // Calculate order values
    const subtotal = validCartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    const discount = validCartItems.reduce((total, item) => {
      return total + ((item.product.discount || 0) * item.quantity);
    }, 0);

    const platformFee = 20; // Only applied when cart has valid items
    const totalAmount = subtotal - discount + platformFee;

    // Create order
    const order = new orderModel({
      user: user._id,
      items: validCartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        discount: item.product.discount || 0
      })),
      subtotal: subtotal,
      discount: discount,
      platformFee: platformFee,
      totalAmount: totalAmount,
      deliveryAddress: user.address || {},
      paymentStatus: 'completed'
    });

    await order.save();
    
    // Clear cart - only remove the valid items we processed
    user.cart = [];
    await user.save();
    
    req.flash("success", "Payment successful! Your order has been placed.");
    res.redirect('/orders');
  } catch (err) {
    console.error("Payment confirmation error:", err);
    req.flash("error", "Payment failed. Please try again.");
    res.redirect('/checkout');
  }
});

module.exports = router;