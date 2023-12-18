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
    include: {
      products: true,
      orderAdditionals: {
        include: {
          additional: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

async function getOrdersByName(name: string) {
  return await prisma.order.findMany({
    where: {customer: name, isClosed: false, isReady: false},
    include: {
      products:true,
      orderAdditionals: true
    }
  })
}

async function cancelOrderAdditionals(orderAdditionalsIds: number[]) {
  return await prisma.orderAdditional.deleteMany({
    where: {
      additionalId: {
        in: orderAdditionalsIds,
      },
    },
  });
}

async function cancelOrder(name: string) {
  return await prisma.order.deleteMany({
    where: {customer: name, isClosed: false, isReady: false}
  })
}

async function getCodeNumber() {
  return await prisma.order.count({
    where: {isClosed:true, isReady:false}
  })
}

const ordersRepository = { createOrder, getOrderNotClosed, cancelOrder, getOrdersByName, cancelOrderAdditionals, getCodeNumber };

export default ordersRepository;
