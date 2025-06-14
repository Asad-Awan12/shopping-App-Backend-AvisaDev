import { Router } from "express";
import { getAll_ShopOrder, getAll_UserOrder, orderCreate, updateStatus } from "../Controllers/order.controller.js";

const orderRouter = Router();

orderRouter.route('/').post(orderCreate)
orderRouter.route('/getAllOwnerOrder/:id').get(getAll_ShopOrder)
orderRouter.route('/getAllUserOrder/:id').get(getAll_UserOrder)
orderRouter.route('/updateStatus/:id').post(updateStatus)



export{
    orderRouter
}