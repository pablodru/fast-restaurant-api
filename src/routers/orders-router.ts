import { Router } from 'express';
import orderController from '@/controllers/orders-controller';
import { validateBody, validateParams } from '@/middlewares/validateSchema';
import { nameSchema, preOrderSchema } from '@/schemas/orders-schema';

const ordersRouter = Router();

ordersRouter
  .post('/order', validateBody(preOrderSchema), orderController.postOrder)
  .get('/order/checkout/:name', validateParams(nameSchema), orderController.getOrderNotClosed)
  .put('/order') //validateSchema
  .get('/orders') // kitchen and customers
  .post('/order/ready/:id') //validateSchema and kitchen
  .delete('/order/:id'); //kitchen

export default ordersRouter;
