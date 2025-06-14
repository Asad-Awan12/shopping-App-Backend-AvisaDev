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

export{
    createReview
}