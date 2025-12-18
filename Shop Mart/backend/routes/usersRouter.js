const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require("../controllers/authController");

// User Registration Routes

router.get('/register', (req, res) => res.render('user-register', {
    loggedin: false,
    error: req.flash('error') || []
}));

router.post('/register', registerUser);

// User Login Routes

router.get('/login', (req, res) => res.render('user-login', {
  loggedin: false,
  error: req.flash('error') || []
}));

router.post('/login', loginUser);



// Logout
router.get('/logout', logout);

// Check auth status (for frontend integration)
router.get('/check-auth', async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.json({ loggedin: false, user: null });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    
    let user;
    if (decoded.role === 'user') {
      const userModel = require('../models/user-model');
      user = await userModel.findById(decoded.id).select("-password");
    } else if (decoded.role === 'owner') {
      const ownerModel = require('../models/owners-model');
      user = await ownerModel.findById(decoded.id).select("-password");
    }

    if (user) {
      return res.json({ 
        loggedin: true, 
        user: { 
          fullname: user.fullname, 
          email: user.email 
        } 
      });
    }
    
    return res.json({ loggedin: false, user: null });
  } catch (err) {
    return res.json({ loggedin: false, user: null });
  }
});

module.exports = router;