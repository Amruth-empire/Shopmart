const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'production' 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI_DEV;

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ✅ (${process.env.NODE_ENV} mode)`))
  .catch(err => console.error("Connection failed:", err));
  

module.exports=mongoose.connection;