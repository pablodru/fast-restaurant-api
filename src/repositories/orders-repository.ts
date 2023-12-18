import { prisma } from '@/config';

async function createOrder(productIds: number[], additionalsIds: number[] = [], name: string) {
  return await prisma.order.create({
    data: {
      customer: name,
      isClosed: false,
      isReady: false,
      products: {
        connect: productIds.map((productId) => ({ id: productId })),
      },
      orderAdditionals: {
        create: additionalsIds?.map((additionalId) => ({ additionalId })),
      },
    },
    include: {
      products: true,
      orderAdditionals: {
        include: {
          additional: true,
        },
      },
    },
  });
}

async function getOrderNotClosed(name: string) {
  return await prisma.order.findMany({
    where: { customer: name, isClosed: false, isReady: false },
    include: { products: true, orderAdditionals: true },
  });
}

const ordersRepository = { createOrder, getOrderNotClosed };

export default ordersRepository;
