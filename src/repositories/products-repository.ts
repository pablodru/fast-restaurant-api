import { prisma } from '@/config';

async function getProducts() {
  return await prisma.product.findMany();
}

const productsRepository = { getProducts };

export default productsRepository;
