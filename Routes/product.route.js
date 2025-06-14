import { Router } from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controllers/product.controller.js";

const productRouter = Router();

productRouter.route('/:id').post(createProduct)
productRouter.route('/getAllProducts').get(getAllProducts)
productRouter.route('/getSingle/:id').get(getSingleProduct)
productRouter.route('/updateProduct/:id').post(updateProduct)
export{
    productRouter
}