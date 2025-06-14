import mongoose from "mongoose";

const shopSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    shopName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },

},{timestamps:true});

const Shop = mongoose.model("Shop",shopSchema);
export{
    Shop
}