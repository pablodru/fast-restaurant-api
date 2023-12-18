import { preOrderSchema } from '@/schemas/orders-schema';
import ordersService from '@/services/orders-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function postOrder(req: Request, res: Response) {
    const { additionalsIds, productIds, name } = req.body as preOrderSchema;

    const response = await ordersService.postOrder(name, productIds, additionalsIds);

    return res.status(httpStatus.CREATED).send(response);
}

const orderController = {postOrder};

export default orderController;