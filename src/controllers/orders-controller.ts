import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PreOrderSchema } from '@/schemas/orders-schema';
import ordersService from '@/services/orders-service';

async function postOrder(req: Request, res: Response) {
  const { additionalsIds, productIds, name, observation } = req.body as PreOrderSchema;

  const response = await ordersService.postOrder({ name, observation }, productIds, additionalsIds);

  return res.sendStatus(httpStatus.CREATED)
}

async function getOrderNotClosed(req: Request, res: Response) {
  const { name } = req.params;

  const response = await ordersService.getOrderNotClosed(name);
  return res.status(httpStatus.OK).send(response);
}

async function cancelOrders(req: Request, res: Response) {
  const { name } = req.params;

  await ordersService.calcelOrders(name);

  return res.sendStatus(httpStatus.NO_CONTENT)
}

async function getCodeNumber(req: Request, res: Response) {
  const codeNumber = await ordersService.getCodeNumber();

  return res.status(httpStatus.OK).send({codeNumber});
}

async function closeOrder(req: Request, res: Response) {
  const { oldName, newName } = req.body;

  const response = await ordersService.closeOrder(oldName, newName);

  return res.status(httpStatus.OK).send(response);
}

async function getOrders(req: Request, res: Response) {
  const response = await ordersService.getOrders();

  return res.status(httpStatus.OK).send(response);
}

async function orderReady(req: Request, res: Response) {
  const { id } = req.body;

  const response = await ordersService.orderReady(id);

  return res.sendStatus(httpStatus.CREATED);
}

async function deleteOrderClosed(req: Request, res: Response) {
  const { id } = req.params;

  const response = await ordersService.deleteOrderClosed(Number(id));

  return res.sendStatus(httpStatus.NO_CONTENT);
}

const orderController = {
  postOrder,
  getOrderNotClosed,
  cancelOrders,
  getCodeNumber,
  closeOrder,
  getOrders,
  orderReady,
  deleteOrderClosed,
};

export default orderController;
