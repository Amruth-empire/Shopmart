const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');


// GET /shop - Show all products
router.get("/", isLoggedin, async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("shop", {
      products: products,
      loggedin: true,
      role: req.role, 
      success: req.flash("success") || [],
      error: req.flash("error") || []
    });
  } catch (err) {
    req.flash("error", "Failed to load products");
    return res.redirect('/');
  }
});


// Change from router.get to router.post
router.post("/addtocart/:productid", isLoggedin, async (req, res) => {
    try {
      const product = await productModel.findById(req.params.productid);
      if (!product) {
        req.flash("error", "Product not found");
        return res.redirect('/shop');
      }
  
      const user = await userModel.findOne({ email: req.user.email });
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect('/shop');
      }
  
      // Initialize cart if undefined
      if (!user.cart) {
        user.cart = [];
      }
  
      // Find existing item with proper null checks
      const existingItem = user.cart.find(item => 
        item && item.product && item.product.toString() === req.params.productid
      );
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        user.cart.push({
          product: req.params.productid,
          quantity: 1
        });
      }
  
      await user.save();
      req.flash("success", "Added to cart");
      res.redirect('/shop');
    } catch (err) {
      console.error("Add to cart error:", err);
      req.flash("error", "Failed to add to cart");
      res.redirect('/shop');
    }
  });

module.exports = router;