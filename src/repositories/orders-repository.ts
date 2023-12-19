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
    where: { customer: name, isClosed: false, isReady: false },
    include: {
      products: true,
      orderAdditionals: true,
    },
  });
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
    where: { customer: name, isClosed: false, isReady: false },
  });
}

async function getCodeNumber() {
  return await prisma.order.count({
    where: { isClosed: true, isReady: false },
  });
}

async function closeOrder(oldName: string, newName: string) {
  return await prisma.order.updateMany({
    where: { customer: oldName },
    data: {
      customer: newName,
      isClosed: true,
    },
  });
}

async function getOrders() {
  return await prisma.order.findMany({
    where: { isClosed: true },
    include: {
      products: true,
      orderAdditionals: {
        include: {
          additional: {
            select: {
              name: true,
              image: true,
              price: true,
            },
          },
        },
      },
    },
  });
}

async function orderReady(id: number) {
  return await prisma.order.update({
    where: { id },
    data: { isReady: true },
  });
}

async function getOrderById(id: number) {
  return await prisma.order.findUnique({
    where: {id},
    include: {orderAdditionals: true}
  })
}

async function deleteOrderAdditionalsById(id: number[]) {
  return await prisma.orderAdditional.deleteMany({
    where: {
      id: {
        in: id,
      }
    }
  })
}

async function deleteOrderClosed(id: number) {
  return await prisma.order.delete({
    where: { id },
  });
}

const ordersRepository = {
  createOrder,
  getOrderNotClosed,
  cancelOrder,
  getOrdersByName,
  cancelOrderAdditionals,
  getCodeNumber,
  closeOrder,
  getOrders,
  orderReady,
  getOrderById,
  deleteOrderAdditionalsById,
  deleteOrderClosed,
};

export default ordersRepository;
