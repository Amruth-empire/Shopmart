const jwt = require('jsonwebtoken');
const userModel = require("../models/user-model");
const ownerModel = require("../models/owners-model");

module.exports = async (req, res, next) => {
    try {
      if(!req.cookies.token) {
        req.flash("error", "Please login first");
        return res.redirect('/login');
      }
  
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      
      let user;
      switch(decoded.role) {
        case 'user':
          user = await userModel.findById(decoded.id).select("-password");
          break;
        case 'owner':
          user = await ownerModel.findById(decoded.id).select("-password");
          break;
        default:
          throw new Error("Invalid user role");
      }
  
      if(!user) {
        req.flash("error", "User not found");
        return res.clearCookie('token').redirect('/login');
      }
      
      req.user = user;
      req.role = decoded.role;
      next();
    } catch(err) {
      res.clearCookie('token');
      req.flash("error", "Session expired. Please login again");
      return res.redirect('/login');
    }
  };