import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const User=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNum:{
        type:Number,
        required:true
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now
    },
    refresh_token:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        required:false
    }
} , {
    timestamps:true,
});

// Match user entered password to hashed password in database
User.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);


    
  };
  
  // Encrypt password using bcrypt
  User.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

export default mongoose.model('User',User);