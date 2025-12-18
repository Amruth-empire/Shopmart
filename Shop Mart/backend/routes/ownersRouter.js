const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isLoggedin = require('../middlewares/isLoggedin');

// Admin Registration
router.get('/create', adminController.showRegisterForm);
router.post('/create', adminController.registerAdmin);

// Admin Login
router.get('/login', adminController.showLoginForm);
router.post('/login', adminController.loginAdmin);

// Admin Dashboard
router.get('/admin',isLoggedin, adminController.showDashboard);

module.exports = router;