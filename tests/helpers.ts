import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.orderAdditional.deleteMany();
  await prisma.order.deleteMany();
  await prisma.additional.deleteMany();
  await prisma.product.deleteMany();
}
