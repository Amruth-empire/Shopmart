const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');

const QRCode = require('qrcode');

router.get("/", isLoggedin, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email })
      .populate({
        path: 'cart.product',
        select: 'name price discount',
        model: 'product'
      });

    if (!user || !user.cart || user.cart.length === 0) {
      req.flash("error", "Your cart is empty");
      return res.redirect('/cart');
    }

    // Calculate total bill
    let bill = 0;
    user.cart.forEach(item => {
      if (item.product && item.product.price) {
        bill += (item.product.price - (item.product.discount || 0)) * (item.quantity || 1);
      }
    });
    bill += 20; // Platform fee

    // Generate UPI payment link
    const upiId = "amruthms09052005-1@oksbi"; 
    const paymentLink = `upi://pay?pa=${upiId}&pn=ShopMart&am=${bill.toFixed(2)}&cu=INR&tn=OrderPayment`;
    
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(paymentLink);

    res.render("checkout", {
      user,
      bill: Number(bill),
      qrCodeDataURL,
      paymentLink,
      loggedin: true,
      role: req.role
    });
  } catch (err) {
    console.error("Checkout error:", err);
    req.flash("error", "Failed to process checkout");
    res.redirect('/cart');
  }
});
  
module.exports = router;