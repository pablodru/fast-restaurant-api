import { faker } from '@faker-js/faker';
import { Categories } from '@prisma/client';
import { prisma } from '@/config';

export async function createProduct() {
  const categories = ['COMBO', 'SIDE', 'DRINK', 'DESSERT'];

  return await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      image: faker.image.imageUrl(),
      description: faker.lorem.paragraph(),
      price: faker.datatype.number(),
      category: categories[faker.datatype.number({ min: 0, max: categories.length - 1 })] as Categories,
    },
  });
}

export async function createAdditional() {
  return await prisma.additional.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: faker.datatype.number(),
      image: faker.image.imageUrl(),
    },
  });
}
