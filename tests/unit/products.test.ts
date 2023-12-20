import { notFoundError } from '@/errors/notFound-error';
import productsService from '@/services/products-service';
import productsRepository from '@/repositories/products-repository';
import additionalRepository from '@/repositories/additionals-repository';

// Mockando o repositório
jest.mock('@/repositories/products-repository');
jest.mock('@/repositories/additionals-repository');

describe('Products Service', () => {
  it('should get products with additionals', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10, category: 'COMBO' },
      // ... adicione mais produtos conforme necessário
    ];

    const mockAdditionals = [
      { id: 1, name: 'Additional 1', description: 'Description 1', price: 5 },
      // ... adicione mais adicionais conforme necessário
    ];

    // Mockando a função getProducts do repositório
    (productsRepository.getProducts as jest.Mock).mockResolvedValue(mockProducts);

    // Mockando a função getAdditionals do repositório
    (additionalRepository.getAdditionals as jest.Mock).mockResolvedValue(mockAdditionals);

    const result = await productsService.getProducts();

    // Verificando se a função do repositório foi chamada
    expect(productsRepository.getProducts).toHaveBeenCalled();
    expect(additionalRepository.getAdditionals).toHaveBeenCalled();

    // Verificando se a resposta está correta
    expect(result.products).toEqual(mockProducts);
    expect(result.additionals).toEqual(mockAdditionals);
  });

  it('should throw notFoundError if no products are found', async () => {
    // Mockando a função getProducts do repositório para retornar uma lista vazia
    (productsRepository.getProducts as jest.Mock).mockResolvedValue([]);
    (additionalRepository.getAdditionals as jest.Mock).mockResolvedValue([]);

    // Verificando se a função lança um notFoundError
    await expect(productsService.getProducts()).rejects.toThrow(notFoundError('Products'));

    // Verificando se a função do repositório foi chamada
    expect(productsRepository.getProducts).toHaveBeenCalled();
    // Certificando-se de que a função getAdditionals não foi chamada neste teste
    expect(additionalRepository.getAdditionals).not.toHaveBeenCalled();
  });
});
