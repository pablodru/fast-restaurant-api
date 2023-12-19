import { notFoundError } from '@/errors/notFound-error';
import additionalRepository from '@/repositories/additionals-repository';
import productsRepository from '@/repositories/products-repository';

async function getProducts() {
  const products = await productsRepository.getProducts();
  const additionals = await additionalRepository.getAdditionals();

  if (!products) throw notFoundError('Products');

  const productsWithAdditionals = { products, additionals };
  return productsWithAdditionals;
}

const productsService = { getProducts };

export default productsService;
