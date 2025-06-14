import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    review:{
        type:String,
        required:true,
    },

},{timestamps:true});

const Review = mongoose.model("Review",reviewSchema);
export{
    Review
}