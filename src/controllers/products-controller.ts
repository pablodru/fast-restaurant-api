import { Request, Response } from 'express';
import httpStatus from 'http-status';
import productsService from '@/services/products-service';

async function getProducts(req: Request, res: Response) {
  const productsWithAdditionals = await productsService.getProducts();

  return res.status(httpStatus.OK).send(productsWithAdditionals);
}

const productsController = { getProducts };

export default productsController;
