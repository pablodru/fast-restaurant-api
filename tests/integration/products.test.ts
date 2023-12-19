import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createAdditional, createProduct } from '../factories/products-factory';
import { cleanDb } from '../helpers';

const server = supertest(app);

beforeAll(async () => {
    await init();
    await cleanDb()
})

beforeEach(async () => {
  await init();
  await cleanDb();
});

describe('GET /products', () => {
    it('shold respond with 404 when have no products', async () => {
        const response = await server.get('/products');
        expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    })
    it('shold respond with 200', async () => {
        await createProduct();
        await createAdditional();
        const response = await server.get('/products');
        expect(response.statusCode).toBe(httpStatus.OK);
    })
})