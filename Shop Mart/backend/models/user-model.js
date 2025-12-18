const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    // In user-model.js
    cart: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true // Ensure product reference is required
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }],
    default: []
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    contact: {
        type: Number,
        default: null
    },
    picture: {
        type: String,
        default: null
    }
});
    module.exports= mongoose.model('user',userSchema);