import { Router } from 'express';
import productsController from '@/controllers/products-controller';

const productsRouter = Router();

productsRouter.get('/products', productsController.getProducts).get('/products/:id');

export default productsRouter;
