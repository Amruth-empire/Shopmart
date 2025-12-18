const mongoose= require('mongoose');
const config =require('config');

mongoose.connect(config.get("MONGODB_URI"))
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch(err => console.error("Connection failed:", err));
  

module.exports=mongoose.connection;