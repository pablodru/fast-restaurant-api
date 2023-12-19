import { prisma } from '@/config';

async function getProducts() {
  return await prisma.product.findMany();
}

async function getProductsByIds(ids: number[]) {
  return await prisma.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

const productsRepository = { getProducts, getProductsByIds };

export default productsRepository;
