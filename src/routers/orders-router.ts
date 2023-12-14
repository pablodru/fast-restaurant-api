import { Router } from 'express';

const ordersRouter = Router();

ordersRouter
  .post('/order') //validateSchema
  .get('/order/checkout')
  .put('/order') //validateSchema
  .get('/orders') // kitchen and customers
  .post('/order/ready/:id') //validateSchema and kitchen
  .delete('/order/:id'); //kitchen

export default ordersRouter;
