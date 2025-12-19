const ownerModel = require('../models/owners-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generatetoken');
const productModel = require('../models/product-model');

const adminController = {
  showRegisterForm: (req, res) => {
    res.render('admin-register', {
      loggedin: false,
      error: req.flash('error') || []
    });
  },

  registerAdmin: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      const owner = await ownerModel.create({
        ...req.body,
        password: hashedPassword
      });
  
      // Redirect to login page after successful registration
      req.flash('success', 'Registration successful! Please login.');
      res.redirect('/owners/admin');
  
    } catch(err) {
      req.flash('error', err.message);
      res.redirect('/owners/admin-register');
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const owner = await ownerModel.findOne({ email });
      
      if(!owner || !(await bcrypt.compare(password, owner.password))) {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/owners/admin');
      }
  
      const token = generateToken(owner, 'owner');
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
      });
      
      // Redirect to admin dashboard after login
      res.redirect('/owners/dashboard');
  
    } catch(err) {
      req.flash('error', 'Login failed');
      res.redirect('/owners/admin');
    }
  },

  showLoginForm: (req, res) => {
    res.render('admin-login', {
      loggedin: false,
      error: req.flash('error') || [],
      success: req.flash('success') || []
    });
  },
 
  
  showDashboard: async (req, res) => {
    if(req.role !== 'owner') {
      req.flash('error', 'Unauthorized access');
      return res.redirect('/');
    }
    
    try {
      const products = await productModel.find().sort({ createdAt: -1 });
      res.render('createproducts', {
        success: req.flash('success'),
        error: req.flash('error'),
        loggedin: true,
        role: req.role,
        products: products // Pass products to view
      });
    } catch(err) {
      console.error('Error fetching products:', err);
      req.flash('error', 'Error loading products');
      res.redirect('/owners/dashboard');
    }
  }
  
};

module.exports = adminController;