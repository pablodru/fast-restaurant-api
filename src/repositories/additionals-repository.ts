import { prisma } from '@/config';

async function getAdditionals() {
  return await prisma.additional.findMany();
}

async function getAdditionalsByIds(ids: number[]) {
  return await prisma.additional.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

const additionalRepository = { getAdditionals, getAdditionalsByIds };

export default additionalRepository;
