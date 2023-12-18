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
  return res.status(httpStatus.OK).send(response);
}

async function cancelOrders(req: Request, res: Response) {
  const { name } = req.params;

  const response = await ordersService.calcelOrders(name);

  return res.status(httpStatus.NO_CONTENT).send(response);
}

async function getCodeNumber(req: Request, res: Response) {
  const codeNumber = await ordersService.getCodeNumber();

  res.status(httpStatus.OK).send(codeNumber)
}

const orderController = { postOrder, getOrderNotClosed, cancelOrders, getCodeNumber };

export default orderController;
