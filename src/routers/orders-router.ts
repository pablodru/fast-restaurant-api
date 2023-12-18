import orderController from '@/controllers/orders-controller';
import { validateBody } from '@/middlewares/validateSchema';
import { preOrderSchema } from '@/schemas/orders-schema';
import { Router } from 'express';

const ordersRouter = Router();

ordersRouter
  .post('/order', validateBody(preOrderSchema), orderController.postOrder)
  .get('/order/checkout')
  .put('/order') //validateSchema
  .get('/orders') // kitchen and customers
  .post('/order/ready/:id') //validateSchema and kitchen
  .delete('/order/:id'); //kitchen

export default ordersRouter;
