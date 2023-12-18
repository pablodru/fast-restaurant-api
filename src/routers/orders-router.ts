import { Router } from 'express';
import orderController from '@/controllers/orders-controller';
import validateName from '@/middlewares/validateName';
import { validateBody } from '@/middlewares/validateSchema';
import { preOrderSchema } from '@/schemas/orders-schema';

const ordersRouter = Router();

ordersRouter
  .post('/order', validateBody(preOrderSchema), orderController.postOrder)
  .get('/order/checkout', validateName, orderController.getOrderNotClosed)
  .put('/order') //validateSchema
  .get('/orders') // kitchen and customers
  .post('/order/ready/:id') //validateSchema and kitchen
  .delete('/order/:id'); //kitchen

export default ordersRouter;
