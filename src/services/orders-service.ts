import { notFoundError } from '@/errors/notFound-error';
import additionalRepository from '@/repositories/additionals-repository';
import ordersRepository from '@/repositories/orders-repository';
import productsRepository from '@/repositories/products-repository';

export type TypeInfos = {
  name: string;
  observation?: string;
};

async function postOrder(infos: TypeInfos, productIds: number[], additionalsIds?: number[]) {
  const existingProducts = await productsRepository.getProductsByIds(productIds);
  if (!existingProducts || existingProducts.length === 0) throw notFoundError('Products');
  if (additionalsIds.length > 0) {
    const existingAdditionals = await additionalRepository.getAdditionalsByIds(additionalsIds);
    if (!existingAdditionals || existingAdditionals.length === 0) throw notFoundError('Additionals');
  }

  const response = await ordersRepository.createOrder(productIds, additionalsIds, infos);
  return response;
}

async function getOrderNotClosed(name: string) {
  const response = await ordersRepository.getOrderNotClosed(name);
  if (response.length === 0) throw notFoundError('Name');
  return response;
}

async function calcelOrders(name: string) {
  const orders = await ordersRepository.getOrdersByName(name);
  if (!orders.length) throw notFoundError('Name');
  const orderAdditionalsIds = orders.flatMap((order) =>
    order.orderAdditionals.map((additional) => additional.additionalId),
  );
  await ordersRepository.cancelOrderAdditionals(orderAdditionalsIds);

  const response = await ordersRepository.cancelOrder(name);
  if (!response) throw notFoundError('Name');
  return response;
}

async function getCodeNumber() {
  const codeNumber = await ordersRepository.getCodeNumber();
  return codeNumber;
}

async function closeOrder(oldName: string, newName: string) {
  const response = await ordersRepository.closeOrder(oldName, newName);
  return response;
}

async function getOrders() {
  const response = await ordersRepository.getOrders();
  const ordersWithUpdatedProducts = response.map((order, i) => {
    const updatedProducts = order.products.map((product) => {
      return {
        ...product,
        codeNumber: i + 1,
      };
    });

    return {
      ...order,
      products: updatedProducts,
    };
  });

  return ordersWithUpdatedProducts;
}

async function orderReady(id: number) {
  const response = await ordersRepository.orderReady(id);

  return response;
}

async function deleteOrderClosed(id: number) {
  const order = await ordersRepository.getOrderById(id);

  const orderAdditionalsIds = order.orderAdditionals.map((additional) => additional.id);

  await ordersRepository.deleteOrderAdditionalsById(orderAdditionalsIds);

  const response = await ordersRepository.deleteOrderClosed(id);

  return response;
}

const ordersService = {
  postOrder,
  getOrderNotClosed,
  calcelOrders,
  getCodeNumber,
  closeOrder,
  getOrders,
  orderReady,
  deleteOrderClosed,
};

export default ordersService;
