import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PreOrderSchema } from '@/schemas/orders-schema';
import ordersService from '@/services/orders-service';

async function postOrder(req: Request, res: Response) {
  const { additionalsIds, productIds, name, observation } = req.body as PreOrderSchema;

  const response = await ordersService.postOrder({name, observation}, productIds, additionalsIds);

  return res.status(httpStatus.CREATED).send(response);
}

async function getOrderNotClosed(req: Request, res: Response) {
  const { name } = req.params;

  const response = await ordersService.getOrderNotClosed(name);
  res.status(httpStatus.OK).send(response);
}

const orderController = { postOrder, getOrderNotClosed };

export default orderController;
