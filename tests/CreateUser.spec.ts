import { AppDataSource } from '@shared/infra/typeorm/data-source';
import request from 'supertest';
import appPromise from '@shared/infra/http/server';
import { App } from 'supertest/types';

describe('Users Module Integration', () => {
  let app: App;

  beforeAll(async () => {
    await AppDataSource.initialize();
    app = (await appPromise) as App;
  });

  afterAll(async () => {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
    await AppDataSource.destroy();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to list users with pagination structure', async () => {
    // 1. Criamos um usuário para garantir que podemos logar
    await request(app).post('/users').send({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
    });

    // 2. Fazemos login para obter o Token
    const sessionResponse = await request(app).post('/sessions').send({
      email: 'admin@example.com',
      password: 'password123',
    });

    const { token } = sessionResponse.body;

    // 3. Chamamos a listagem enviando o Token no Header (Authorization)
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`) // <--- ISSO RESOLVE O 401
      .query({
        page: 1,
        limit: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('per_page', 10);
    expect(response.body).toHaveProperty('current_page', 1);
    expect(response.body).toHaveProperty('data');
  });

  it('should not be able to create a user with duplicate email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      password: '654321',
    });

    expect(response.status).toBe(409);
  });
});
