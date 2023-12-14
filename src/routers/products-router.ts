import productsController from "@/controllers/products-controller";
import { Router } from "express";

const productsRouter = Router();

productsRouter
    .get('/products', productsController.getProducts)
    .get('/products/:id',)

export default productsRouter;