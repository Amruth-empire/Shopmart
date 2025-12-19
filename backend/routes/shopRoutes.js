const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../models/user-model');


// GET /shop - Show all products
router.get("/", isLoggedin, async (req, res) => {
  try {
    const { sort, filter } = req.query;

    const findQuery = {};
    if (filter === 'discounted') {
      findQuery.discount = { $gt: 0 };
    } else if (filter === 'available') {
      // Treat older products (without inStock) as in-stock.
      findQuery.$or = [{ inStock: true }, { inStock: { $exists: false } }];
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'priceLowHigh') {
      sortQuery = { price: 1 };
    } else if (sort === 'priceHighLow') {
      sortQuery = { price: -1 };
    } else if (sort === 'discountHighLow') {
      sortQuery = { discount: -1 };
    } else if (sort === 'newest') {
      sortQuery = { createdAt: -1 };
    } else if (!sort && filter === 'discounted') {
      // Default behavior: when viewing only discounted products, show highest discount first.
      sortQuery = { discount: -1 };
    }

    const products = await productModel.find(findQuery).sort(sortQuery);
    res.render("shop", {
      products: products,
      loggedin: true,
      role: req.role, 
      sort: sort || (filter === 'discounted' ? 'discountHighLow' : 'newest'),
      filter: filter || '',
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