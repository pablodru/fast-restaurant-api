import { prisma } from '@/config';

async function getAdditionals() {
  return await prisma.additional.findMany();
}

const additionalRepository = { getAdditionals };

export default additionalRepository;
