import productsService from '@/services/products-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function getProducts(req:Request, res: Response) {

    const products = await productsService.getProducts();

    return res.status(httpStatus.OK).send(products);
}

const productsController = {getProducts};

export default productsController;