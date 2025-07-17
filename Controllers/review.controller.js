import mongoose from "mongoose";
import { Review } from "../Models/review.model.js";

const createReview = async(req,res)=>{
    const {id} = req.params;
    let {review,userId} = req.body;
    try {
          if (
      [review].some(
        (field) => field.trim === ""
      )
    ) {
      return res.status(501).json({ message: "All fields are required" });
    }
    const create_review = await Review.create({
        productId:id,
        review,
        userId:userId
    })
    res.status(501).json({message:"Post Review Successfully",create_review})
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"Error in creating review"})
    }
}

const getAllreview = async(req,res)=>{
try {
  const result = await Review.aggregate([
  {
    $match: { productId: new mongoose.Types.ObjectId('_id') } // filter by product
  },
  {
    $group: {
      _id: "$productId",
      // averageRating: { $avg: "$rating" },
      totalReviews: { $sum: 1 }
    }
  }
]);
return res.status(201).json({message:"Successfully Fetching Reviews",result})
} catch (error) {
  console.log(error)
   res.status(501).json({message:"Error in Fetching Reviews"})
}
}
export{
    createReview,
    getAllreview
}