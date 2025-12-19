const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generatetoken');

module.exports.registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    
    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash('error', 'User already exists. Please login.');
      return res.redirect('/users/register');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user, 'user');
    
    // Set cookie and redirect
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    });
    
    res.locals.role = 'user';
    req.role = 'user';
  
    return res.redirect('/users/login');

  } catch (err) {
    req.flash('error', err.message);
    return res.redirect('/users/register');
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/users/login');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/users/login');
    }

    // Generate token
    const token = generateToken(user, 'user');
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24
    });
    
    req.flash('success', 'Login is successful!');
    return res.redirect('/shop');

  } catch (err) {
    req.flash('error', 'Login failed');
    return res.redirect('/users/login');
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.redirect('/',);
};