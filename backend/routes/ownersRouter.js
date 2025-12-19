const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isLoggedin = require('../middlewares/isLoggedin');

// Admin Registration
router.get('/admin-register', adminController.showRegisterForm);
router.post('/admin-register', adminController.registerAdmin);

// Admin Login
router.get('/admin', adminController.showLoginForm);
router.post('/admin', adminController.loginAdmin);

// Admin Dashboard
router.get('/dashboard', isLoggedin, adminController.showDashboard);

module.exports = router;