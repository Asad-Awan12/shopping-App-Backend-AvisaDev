import { Router } from "express";
import { createReview } from "../Controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.route('/:id').post(createReview)

export{
    reviewRouter
}