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

module.exports = router;