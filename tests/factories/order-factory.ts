import { prisma } from "@/config";
import { faker } from '@faker-js/faker';

export async function createOrder(productIds: number[], additionalsIds: number[] = []) {
    return await prisma.order.create({
      data: {
        customer: faker.person.firstName(),
        isClosed: false,
        isReady: false,
        observation: faker.person.lastName(),
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

  export async function createOrderClosed(productIds: number[], additionalsIds: number[] = []) {
    return await prisma.order.create({
      data: {
        customer: faker.person.firstName(),
        isClosed: true,
        isReady: false,
        observation: faker.person.lastName(),
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