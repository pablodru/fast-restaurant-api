import { Router } from 'express';
import orderController from '@/controllers/orders-controller';
import { validateBody, validateParams } from '@/middlewares/validateSchema';
import { closeOrderSchema, nameSchema, orderReadySchema, preOrderSchema } from '@/schemas/orders-schema';

const ordersRouter = Router();

ordersRouter
  .post('/order', validateBody(preOrderSchema), orderController.postOrder)
  .get('/order/checkout/:name', validateParams(nameSchema), orderController.getOrderNotClosed)
  .delete('/order/cancel/:name', validateParams(nameSchema), orderController.cancelOrders)
  .get('/order/number', orderController.getCodeNumber)
  .put('/order', validateBody(closeOrderSchema), orderController.closeOrder)
  .get('/orders/closed', orderController.getOrders)
  .post('/order/ready', validateBody(orderReadySchema), orderController.orderReady)
  .delete('/order/closed', validateBody(orderReadySchema), ); //kitchen

export default ordersRouter;
