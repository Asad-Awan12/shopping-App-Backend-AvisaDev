import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
      fullName:{
        type:String,
        unique:true,
        required:true
      },
      status:{
        type:String,
        enum:["Patient","Doctor"],
        default:"Patient"
      },
      email:{
        type:String,
        unique:true,
        required:true
      },
      password:{
        type:String,
        unique:true,
        required:true
      },

      // profilePic:{
      //   type:String,
      //   required:true
      // },

      // phoneNumber:{
      //   type:Number,
      //   unique:true,
      //   required:true
      // },

      // isAdmin:{
      //   type:Boolean,
      //   required:true,
      //   default:false
      // }

      // otp:{
      //   type:Number,
      //   unique:true,
      //   required:true
      // },
    
      
    },{timestamps:true}
);

// Bcrypt Password

// Bcrypt Password
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

// Compare Password while Login
userSchema.methods.comparePassword =async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export{
    User
}