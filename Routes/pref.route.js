import { Router } from "express";
import { createPref } from "../Controllers/pref.controller.js";
import { upload } from "../Middleware/middleware.js";

const prefRouter = Router();

prefRouter.route('/').post(
    upload.single('profile'),
    createPref)


export{
    prefRouter
}