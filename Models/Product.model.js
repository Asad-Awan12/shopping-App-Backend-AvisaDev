import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    productName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    discountprice:{
        type:Number,
        required:true
    }

},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
export{
    Product
}