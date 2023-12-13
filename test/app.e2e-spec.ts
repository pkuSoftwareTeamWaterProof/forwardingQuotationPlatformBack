import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EntityManager } from 'typeorm';

async function clearDb(app: INestApplication): Promise<void> {
  const entityManager = app.get<EntityManager>(EntityManager);
  const tableNames = entityManager.connection.entityMetadatas.map(
    (entity) => entity.tableName
  );
  await entityManager.query(`SET FOREIGN_KEY_CHECKS = 0;`);
  for (const tableName of tableNames) {
    await entityManager.query(`TRUNCATE TABLE ${tableName};`);
  }
  await entityManager.query(`SET FOREIGN_KEY_CHECKS = 1;`);
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const testcustomer = {
    username: 'laolee010126',
    password: 'password123@',
    role: 'customer',
    telephone: '18501347653',
    email: 'test@myemail.com',
  };
  const duptestuser = {
    username: 'laolee010126',
    password: 'password123@',
    role: 'forwarder',
    telephone: '18501347653',
    email: 'test@myemail.com',
  };
  const testforwarder = {
    username: 'waterking201030',
    password: 'password123@',
    role: 'forwarder',
    telephone: '18501347653',
    email: 'test@myemail.com',
  };
  const testadmin = {
    username: 'shuiliunian',
    password: 'password123@',
    role: 'administrator',
    telephone: '18501347653',
    email: 'test@myemail.com',
  };

  describe('user module', () => {
    it('/api/user/create (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer)
        .expect(HttpStatus.CREATED);
    });

    it('/api/user/create (POST) dup', async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      const res = await request(app.getHttpServer())
        .post('/api/user/create')
        .send(duptestuser)
        expect(res.status).toBe(HttpStatus.CONFLICT);
    });

    it('/api/user/getByName (GET)', async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testadmin);
      const res = await request(app.getHttpServer())
        .get('/api/user/getByName/shuiliunian')
        .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.username).toBe('shuiliunian');
      expect(res.body.role).toBe('administrator');
    });

    it('/api/user/getByName (GET) null', async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testadmin);
      const res = await request(app.getHttpServer())
        .get('/api/user/getByName/jellllly420')
        .send();
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
    });

    it('/api/user/getById (GET)', async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testadmin);
      const res = await request(app.getHttpServer())
        .get('/api/user/getByName/shuiliunian')
        .send();
      const res2 = await request(app.getHttpServer())
      .get('/api/user/getById/'+res.body.id)
      .send();
      expect(res2.status).toBe(HttpStatus.OK);
      expect(res2.body).toStrictEqual(res.body);
    });

    it('/api/user/getById (GET)', async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testadmin);
      const res = await request(app.getHttpServer())
        .get('/api/user/getById/0')
        .send();
      expect(res.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  afterEach(async () => {
    await clearDb(app);
    await app.close();
  });
});
