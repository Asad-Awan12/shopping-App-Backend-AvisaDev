import { Router } from "express";
import { createReview, getAllreview } from "../Controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.route('/:id').post(createReview)
reviewRouter.route('/').post(getAllreview)

export{
    reviewRouter
}