import { Router } from "express";
import { createPref } from "../Controllers/pref.controller.js";

const prefRouter = Router();

prefRouter.route('/:id').post(createPref)


export{
    prefRouter
}