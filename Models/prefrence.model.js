import mongoose, { model, Types } from "mongoose";

const prefrenceSchema = mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    // required:true
   },
   username:{
    type:String,
    required:true
   },
   age:{
    type:Number,
    required:true
   },
   gender:{
    type:String,
    required:true
   },
   location:{
    type:String,
    // required:true
   },
   interest:{
    type:String,
    required:true
   },
   education:{
    type:String,
    // required:true
   },
   profile:{
    type:String,
    // required:true
   }
},{timestamps:true})

const Pref = mongoose.model("Pref",prefrenceSchema);
export{
    Pref
}