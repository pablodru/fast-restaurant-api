import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createAdditional, createProduct } from '../factories/products-factory';
import { cleanDb } from '../helpers';
import { faker } from '@faker-js/faker';

const server = supertest(app);

beforeAll(async () => {
    await init();
    await cleanDb()
})

beforeEach(async () => {
  await init();
  await cleanDb();
});

describe('POST /order', () => {
    it('should respond with 422 when body is invalid', async () => {
        const response = await server.post('/order').send({});
        expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    })
    it("should respond with 404 when Product doesn't exists", async () => {
        const response = await server.post('/order').send({
            productIds: [faker.datatype.number()],
            name: faker.person.firstName()
        });
        expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    })
    it("should respond with 404 when Additional doesn't exists", async () => {
        const product = await createProduct();
        const response = await server.post('/order').send({
            productIds: [product.id],
            additionalsIds:[faker.datatype.number()],
            name: faker.person.firstName()
        });
        expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    })
    it("should respond with 201", async () => {
        const product = await createProduct();
        const additional = await createAdditional();
        const response = await server.post('/order').send({
            productIds: [product.id],
            additionalsIds:[additional.id],
            name: faker.person.firstName()
        });
        expect(response.statusCode).toBe(httpStatus.CREATED);
    })
})