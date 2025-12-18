const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');

router.get("/", isLoggedin, async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email })
        .populate({
          path: 'cart.product',
          select: 'name price discount image bgcolor panelcolor textcolor',
          model: 'product'
        });
  
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect('/shop');
      }
  
      let bill = 0;
      if (user.cart && user.cart.length > 0) {
        user.cart.forEach(item => {
          if (item.product && item.product.price) {
            bill += (item.product.price - (item.product.discount || 0)) * (item.quantity || 1);
          }
        });
      }
      bill += 20; // Platform fee
  
      res.render("cart", {
        user,
        bill,
        loggedin: true,
        role: req.role,
        success: req.flash("success"),
        error: req.flash("error")
      });
    } catch (err) {
      console.error("Cart error:", err);
      req.flash("error", "Failed to load cart");
      res.redirect('/shop');
    }
  });
  

  // Increase quantity
router.post("/increase/:productid", isLoggedin, async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      if (!user || !user.cart) {
        req.flash("error", "Cart not found");
        return res.redirect('/cart');
      }
  
      const item = user.cart.find(item => 
        item && item.product && item.product.toString() === req.params.productid
      );
      
      if (item) {
        item.quantity += 1;
        await user.save();
      }
      
      res.redirect('/cart');
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to update quantity");
      res.redirect('/cart');
    }
  });
  
  // Decrease quantity
  router.post("/decrease/:productid", isLoggedin, async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      if (!user || !user.cart) {
        req.flash("error", "Cart not found");
        return res.redirect('/cart');
      }
  
      const itemIndex = user.cart.findIndex(item => 
        item && item.product && item.product.toString() === req.params.productid
      );
      
      if (itemIndex !== -1) {
        if (user.cart[itemIndex].quantity > 1) {
          user.cart[itemIndex].quantity -= 1;
        } else {
          user.cart.splice(itemIndex, 1);
        }
        await user.save();
      }
      
      res.redirect('/cart');
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to update quantity");
      res.redirect('/cart');
    }
  });
  
  // Remove item
  router.post("/remove/:productid", isLoggedin, async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      if (!user || !user.cart) {
        req.flash("error", "Cart not found");
        return res.redirect('/cart');
      }
  
      user.cart = user.cart.filter(item => 
        item && item.product && item.product.toString() !== req.params.productid
      );
      await user.save();
      res.redirect('/cart');
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to remove item");
      res.redirect('/cart');
    }
  });
  
  module.exports = router;
  
  