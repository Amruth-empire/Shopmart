const isLoggedin =require('../middlewares/isLoggedin')
const express = require('express');
const router = express.Router();

// GET / - Home page
router.get('/', (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

// GET /logout - Logout user
router.get("/logout", isLoggedin, async (req, res) => 
    {   
    res.cookie("token","");
    res.redirect('/');
    });

module.exports = router;