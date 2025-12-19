const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model');

// View orders
router.get("/", isLoggedin, async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.render("orders", {
      orders,
      loggedin: true,
      role: req.role,
      success: req.flash("success"),
      error: req.flash("error")
    });
  } catch (err) {
    console.error("Orders error:", err);
    req.flash("error", "Failed to load orders");
    res.redirect('/');
  }
});

module.exports = router;