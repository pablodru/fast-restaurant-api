import { prisma } from '@/config';
import { TypeInfos } from '@/services/orders-service';

async function createOrder(productIds: number[], additionalsIds: number[] = [], infos: TypeInfos) {
  return await prisma.order.create({
    data: {
      customer: infos.name,
      isClosed: false,
      isReady: false,
      observation: infos.observation,
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
