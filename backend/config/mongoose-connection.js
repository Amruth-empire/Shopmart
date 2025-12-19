const mongoose = require('mongoose');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

// Supported env var names (kept flexible to match current .env and past configs)
const MONGODB_URI =
  (isProd ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV) ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error(
    'MongoDB URI is missing. Set one of: MONGO_URI, MONGODB_URI, MONGODB_URI_DEV, MONGODB_URI_PROD'
  );
  throw new Error('MongoDB URI missing');
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ✅ (${process.env.NODE_ENV} mode)`))
  .catch(err => console.error("Connection failed:", err));
  

module.exports=mongoose.connection;