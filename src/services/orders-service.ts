import { notFoundError } from '@/errors/notFound-error';
import additionalRepository from '@/repositories/additionals-repository';
import ordersRepository from '@/repositories/orders-repository';
import productsRepository from '@/repositories/products-repository';

export type TypeInfos = {
  name: string,
  observation?:string
}

async function postOrder(infos: TypeInfos, productIds: number[], additionalsIds?: number[]) {
  const existingProducts = await productsRepository.getProductsByIds(productIds);
  if (!existingProducts || existingProducts.length === 0) throw notFoundError('Products');
  if (additionalsIds.length>0) {
    const existingAdditionals = await additionalRepository.getAdditionalsByIds(additionalsIds);
    if (!existingAdditionals || existingAdditionals.length === 0) throw notFoundError('Additionals');
  }

  const response = await ordersRepository.createOrder(productIds, additionalsIds, infos);
  return response;
}

async function getOrderNotClosed(name: string) {
  const response = await ordersRepository.getOrderNotClosed(name);
  if (!response) throw notFoundError('Name');
  return response;
}

async function calcelOrders(name:string) {
  const orders = await ordersRepository.getOrdersByName(name);
  const orderAdditionalsIds = orders.flatMap(order =>
    order.orderAdditionals.map(additional => additional.additionalId)
  );
  await ordersRepository.cancelOrderAdditionals(orderAdditionalsIds);

  const response = await ordersRepository.cancelOrder(name);
  if (!response) throw notFoundError('Name');
  return response;
}

const ordersService = { postOrder, getOrderNotClosed, calcelOrders };

export default ordersService;
