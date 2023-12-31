import httpStatus from 'http-status';
import supertest from 'supertest';
import { createAdditional, createProduct } from '../factories/products-factory';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

const server = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await init();
  await cleanDb();
});

describe('GET /products', () => {
  it('should respond with 404 when have no products', async () => {
    const response = await server.get('/products');
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it('should respond with 200', async () => {
    await createProduct();
    await createAdditional();
    const response = await server.get('/products');
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});
