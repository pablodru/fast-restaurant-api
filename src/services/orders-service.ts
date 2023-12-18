import { notFoundError } from '@/errors/notFound-error';
import additionalRepository from '@/repositories/additionals-repository';
import ordersRepository from '@/repositories/orders-repository';
import productsRepository from '@/repositories/products-repository';

async function postOrder(name: string, productIds: number[], additionalsIds?: number[]) {
  const existingProducts = await productsRepository.getProductsByIds(productIds);
  if (!existingProducts || existingProducts.length === 0) throw notFoundError('Products');
  if (additionalsIds) {
    const existingAdditionals = await additionalRepository.getAdditionalsByIds(additionalsIds);
    if (!existingAdditionals || existingAdditionals.length === 0) throw notFoundError('Additionals');
  }

  const response = await ordersRepository.createOrder(productIds, additionalsIds, name);
  return response;
}

async function getOrderNotClosed(name: string) {
  const response = await ordersRepository.getOrderNotClosed(name);
  if (!response) throw notFoundError('Name');
  return response;
}

const ordersService = { postOrder, getOrderNotClosed };

export default ordersService;
