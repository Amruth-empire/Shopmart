const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create',
  upload.single("image"), 
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error('No image file uploaded');
      }

      const product = await productModel.create({
        name: req.body.name,
        price: parseFloat(req.body.price),
        discount: parseFloat(req.body.discount || 0),
        bgcolor: req.body.bgcolor,
        panelcolor: req.body.panelcolor,
        textcolor: req.body.textcolor,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      });

      req.flash('success', 'Product created successfully');
      res.redirect('/owners/admin');
    } catch(err) {
      console.error('Error creating product:', err);
      req.flash('error', err.message);
      res.redirect('/owners/admin');
    }
  }
);

module.exports = router;