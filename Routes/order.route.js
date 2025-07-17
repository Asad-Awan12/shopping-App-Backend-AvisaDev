import { Router } from "express";
import { created_Order, getAll_ShopOrder, getAll_UserOrder, updateStatus } from "../Controllers/order.controller.js";

const orderRouter = Router();

orderRouter.route('/').post(created_Order)
orderRouter.route('/getAllOwnerOrder/:id').get(getAll_ShopOrder)
orderRouter.route('/getAllUserOrder/:id').get(getAll_UserOrder)
orderRouter.route('/updateStatus/:id').post(updateStatus)



export{
    orderRouter
}