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
      const adminCount = await ownerModel.countDocuments();
      if (adminCount > 0) {
        req.flash('error', 'Admin registration is closed');
        return res.redirect('/owners/login');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
      const owner = await ownerModel.create({
        ...req.body,
        password: hashedPassword
      });
  
      const token = generateToken(owner, 'owner');
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      });
      
      // Redirect to admin dashboard after registration
      res.redirect('/owners/login');
  
    } catch(err) {
      req.flash('error', err.message);
      res.redirect('/owners/create');
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const owner = await ownerModel.findOne({ email });
      
      if(!owner || !(await bcrypt.compare(password, owner.password))) {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/owners/login');
      }
  
      const token = generateToken(owner, 'owner');
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
      });
      
      // Redirect to admin dashboard after login
      res.redirect('/owners/admin');
  
    } catch(err) {
      req.flash('error', 'Login failed');
      res.redirect('/owners/login');
    }
  },

  showLoginForm: (req, res) => {
    res.render('admin-login', {
      loggedin: false,
      error: req.flash('error') || []
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
      res.redirect('/owners/admin');
    }
  }
  
};

module.exports = adminController;