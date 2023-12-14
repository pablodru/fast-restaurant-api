import { notFoundError } from "@/errors/notFound-error";
import productsRepository from "@/repositories/products-repository";

async function getProducts() {
    const products = await productsRepository.getProducts();

    if(!products) throw notFoundError("Products");

    return products;
}

const productsService = {getProducts};

export default productsService;