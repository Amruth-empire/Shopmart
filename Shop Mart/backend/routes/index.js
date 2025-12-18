const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./authRoutes');
const shopRoutes = require('./shopRoutes');
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const paymentRoutes =require('./paymentRoutes');
const ordersRoutes = require('./orderRoutes');

// Use the route files
router.use('/', authRoutes);
router.use('/shop', shopRoutes);
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/confirm-payment',paymentRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;