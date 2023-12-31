import httpStatus from 'http-status';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { createAdditional, createProduct } from '../factories/products-factory';
import { cleanDb } from '../helpers';
import { createOrder, createOrderClosed } from '../factories/order-factory';
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

describe('POST /order', () => {
  it('should respond with 422 when body is invalid', async () => {
    const response = await server.post('/order').send({});
    expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should respond with 404 when Product doesn't exists", async () => {
    const response = await server.post('/order').send({
      productIds: [faker.datatype.number()],
      name: faker.person.firstName(),
    });
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with 404 when Additional doesn't exists", async () => {
    const product = await createProduct();
    const response = await server.post('/order').send({
      productIds: [product.id],
      additionalsIds: [faker.datatype.number()],
      name: faker.person.firstName(),
    });
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it('should respond with 201', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const response = await server.post('/order').send({
      productIds: [product.id],
      additionalsIds: [additional.id],
      name: faker.person.firstName(),
    });
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
});

describe('GET /order/checkout/:name', () => {
  it('should respond with 404 when Name is not found', async () => {
    const response = await server.get(`/order/checkout/${faker.person.firstName()}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const order = await createOrder([product.id], [additional.id]);
    const response = await server.get(`/order/checkout/${order.customer}`);
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});

describe('DELETE /order/cancel/:name', () => {
  it('should respond with 404 when Name is not found', async () => {
    const response = await server.delete(`/order/cancel/${faker.person.firstName()}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it('should respond with 204', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const order = await createOrder([product.id], [additional.id]);
    const response = await server.delete(`/order/cancel/${order.customer}`);
    expect(response.statusCode).toBe(httpStatus.NO_CONTENT);
  });
});

describe('PUT /order', () => {
  it('should respond with 422 when body is invalir', async () => {
    const response = await server.put(`/order`).send({});
    expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const order = await createOrder([product.id], [additional.id]);
    const response = await server.put(`/order`).send({ oldName: order.customer, newName: faker.person.lastName() });
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});

describe('GET /order/number', () => {
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    await createOrderClosed([product.id], [additional.id]);
    const response = await server.get(`/order/number`);
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});

describe('GET /orders/closed', () => {
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    await createOrderClosed([product.id], [additional.id]);
    const response = await server.get(`/orders/closed`);
    expect(response.statusCode).toBe(httpStatus.OK);
  });
});

describe('POST /order/ready', () => {
  it('should respond with 422 when body is invalid', async () => {
    const response = await server.post(`/order/ready`).send({});
    expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const order = await createOrderClosed([product.id], [additional.id]);
    const response = await server.post(`/order/ready`).send({ id: order.id });
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
});

describe('DELETE /order/closed/:id', () => {
  it('should respond with 422 when params is invalid', async () => {
    const response = await server.delete(`/order/closed/${faker.person.firstName()}`);
    expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should respond with 200', async () => {
    const product = await createProduct();
    const additional = await createAdditional();
    const order = await createOrderClosed([product.id], [additional.id]);
    const response = await server.delete(`/order/closed/${order.id}`);
    expect(response.statusCode).toBe(httpStatus.NO_CONTENT);
  });
});
