import { Router } from "express";
import { createShop, deleteShop, getAllShop } from "../Controllers/shop.controller.js";

const shopRouter = Router();

shopRouter.route('/:id').post(createShop)
shopRouter.route('/delShop/:id').post(deleteShop)
shopRouter.route('/getAllShop').get(getAllShop)
export{
    shopRouter
}