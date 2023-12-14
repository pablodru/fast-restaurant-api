import { Router } from "express";
import productsRouter from "./products-router";
import ordersRouter from "./orders-router";

const router = Router();

router
    .use(productsRouter)
    .use(ordersRouter);

export default router;