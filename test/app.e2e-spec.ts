import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EntityManager } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Sheet } from 'src/modules/sheet/entity/sheet.entity';
import { Answer } from 'src/modules/answer/entity/answer.entity';
import exp from 'constants';

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
  const testsheettemp = {
    startpoint: '中国北京',
    endpoint: '美国华盛顿@',
    weight: 100,
    size: 100,
    species: '化妆品',
    type_of_shipping: '海运@',
    remark: '加急加钱',
    startdate: '2023-11-13',
    enddate: '2023-12-01',
    customerID: 'string',
  };
  const testanswertemp = {
    price: 100,
    remark: '要加钱',
    Sheetid: 'string',
    forwarderID: 'string',
  };
  const testordertemp = {
    sheetid: 'string',
    answerid: 'string',
    context: '成交',
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
        .send(duptestuser);
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
        .get('/api/user/getById/' + res.body.id)
        .send();
      expect(res2.status).toBe(HttpStatus.OK);
      expect(res2.body).toStrictEqual(res.body);
    });

    it('/api/user/getById (GET) null', async () => {
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

  describe('sheet module', () => {
    var customer: User;
    var forwarder: User;

    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      customer = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/laolee010126')
          .send()
      ).body;
      forwarder = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/waterking201030')
          .send()
      ).body;
    });

    it('/api/sheet/create (POST)', async () => {
      var sheet = Object.assign({}, testsheettemp);
      sheet.customerID = customer.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheet)
        .expect(HttpStatus.CREATED);
    });

    it('/api/sheet/create (POST) unvalid customer', async () => {
      const user = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/waterking201030')
          .send()
      ).body;
      var sheet = Object.assign({}, testsheettemp);
      sheet.customerID = forwarder.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheet)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('/api/sheet (GET)', async () => {
      var sheet = Object.assign({}, testsheettemp);
      sheet.customerID = customer.id;
      await request(app.getHttpServer()).post('/api/sheet/create').send(sheet);
      const res = await request(app.getHttpServer()).get('/api/sheet').send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.length).toBe(1);
      expect(res.body[0].startpoint).toBe('中国北京');
    });

    it('/api/sheet/{:sheetId} (GET)', async () => {
      var sheetdto = Object.assign({}, testsheettemp);
      sheetdto.customerID = customer.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheetdto);
      const res: Sheet[] = (
        await request(app.getHttpServer()).get('/api/sheet').send()
      ).body;
      var sheet = res[0];
      const sheetres = await request(app.getHttpServer())
        .get('/api/sheet/' + sheet.id)
        .send();
      expect(sheetres.status).toBe(HttpStatus.OK);
      expect(sheetres.body).toStrictEqual(sheet);
    });

    it('/api/sheet/{:sheetId} (GET) null', async () => {
      const sheetres = await request(app.getHttpServer())
        .get('/api/sheet/0')
        .send();
      expect(sheetres.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('/api/sheet/list/{:customerId} (GET)', async () => {
      var sheetdto = Object.assign({}, testsheettemp);
      sheetdto.customerID = customer.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheetdto);
      const res: Sheet[] = (
        await request(app.getHttpServer()).get('/api/sheet').send()
      ).body;
      var sheet = res[0];
      const sheetres = await request(app.getHttpServer())
        .get('/api/sheet/list/' + customer.id)
        .send();
      expect(sheetres.status).toBe(HttpStatus.OK);
      expect(sheetres.body.length).toBe(1);
      expect(sheetres.body[0]).toStrictEqual(sheet);
    });

    it('/api/sheet/list/{:customerId} (GET) invalid customer', async () => {
      const sheetres = await request(app.getHttpServer())
        .get('/api/sheet/list/' + forwarder.id)
        .send();
      expect(sheetres.status).toBe(HttpStatus.BAD_REQUEST);
      expect(sheetres.body.message).toBe('Unknown User');
    });
  });

  describe('answer module', () => {
    var customer: User;
    var forwarder: User;
    var sheet: Sheet;
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      customer = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/laolee010126')
          .send()
      ).body;
      forwarder = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/waterking201030')
          .send()
      ).body;
      var sheetdto = Object.assign({}, testsheettemp);
      sheetdto.customerID = customer.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheetdto);
      sheet = (await request(app.getHttpServer()).get('/api/sheet').send())
        .body[0];
    });

    it('/api/answer/create (POST)', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer())
        .post('/api/answer/create')
        .send(dto)
        .expect(HttpStatus.CREATED);
    });

    it('/api/answer/create (POST) unvalid user', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = customer.id;
      dto.Sheetid = sheet.id;
      const res = await request(app.getHttpServer())
        .post('/api/answer/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe('Unknown Forwarder');
    });

    it('/api/answer/create (POST) unvalid sheet', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = '0';
      const res = await request(app.getHttpServer())
        .post('/api/answer/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe('Unknown Sheet');
    });

    it('/api/answer/list/{:forwarderId}', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const res = await request(app.getHttpServer())
        .get('/api/answer/list/' + forwarder.id)
        .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.length).toBe(1);
      expect(res.body[0].forwarderID).toBe(forwarder.id);
    });

    it('/api/answer/list/{:forwarderId} unvalid user', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const res = await request(app.getHttpServer())
        .get('/api/answer/list/0')
        .send();
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('/api/answer/sheet/{:sheetId}', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const answers = (
        await request(app.getHttpServer())
          .get('/api/answer/list/' + forwarder.id)
          .send()
      ).body;
      const res = await request(app.getHttpServer())
        .get('/api/answer/sheet/' + sheet.id)
        .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toStrictEqual(answers[0]);
    });

    it('/api/answer/sheet/{:sheetId} unvalid sheet', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const res = await request(app.getHttpServer())
        .get('/api/answer/sheet/0')
        .send();
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('/api/answer/{:answerId}', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const answer = (
        await request(app.getHttpServer())
          .get('/api/answer/list/' + forwarder.id)
          .send()
      ).body[0];
      const res = await request(app.getHttpServer())
        .get('/api/answer/' + answer.id)
        .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toStrictEqual(answer);
    });

    it('/api/answer/{:answerId}', async () => {
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      const answer = (
        await request(app.getHttpServer())
          .get('/api/answer/list/' + forwarder.id)
          .send()
      ).body[0];
      const res = await request(app.getHttpServer())
        .get('/api/answer/0')
        .send();
      expect(res.status).toBe(404);
    });
  });

  describe('order module', () => {
    var customer: User;
    var forwarder: User;
    var sheet0: Sheet;
    var sheet1: Sheet;
    var answer: Answer;
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testcustomer);
      await request(app.getHttpServer())
        .post('/api/user/create')
        .send(testforwarder);
      customer = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/laolee010126')
          .send()
      ).body;
      forwarder = (
        await request(app.getHttpServer())
          .get('/api/user/getByName/waterking201030')
          .send()
      ).body;
      var sheetdto = Object.assign({}, testsheettemp);
      sheetdto.customerID = customer.id;
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheetdto);
      await request(app.getHttpServer())
        .post('/api/sheet/create')
        .send(sheetdto);
      const sheets = (await request(app.getHttpServer()).get('/api/sheet').send())
        .body;
      sheet0 = sheets[0];
      sheet1 = sheets[1];
      var dto = Object.assign({}, testanswertemp);
      dto.forwarderID = forwarder.id;
      dto.Sheetid = sheet0.id;
      await request(app.getHttpServer()).post('/api/answer/create').send(dto);
      answer = (
        await request(app.getHttpServer())
          .get('/api/answer/list/' + forwarder.id)
          .send()
      ).body[0];
    });

    it('/api/order/create (POST)', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = sheet0.id;
      dto.answerid = answer.id;
      const res = await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.CREATED);
    });

    it('/api/order/create (POST) unvalid sheet', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = '0';
      dto.answerid = answer.id;
      const res = await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe("Unknown sheet");
    });

    it('/api/order/create (POST) unvalid answer', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = sheet0.id;
      dto.answerid = '0';
      const res = await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe("Unknown answer");
    });

    it('/api/order/create (POST) unpaired', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = sheet1.id;
      dto.answerid = answer.id;
      const res = await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe("Unpaired answer and sheet");
    });

    it('/api/order/sheetid/{:sheetID} (GET)', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = sheet0.id;
      dto.answerid = answer.id;
      await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      const res = await request(app.getHttpServer())
      .get('/api/order/sheetid/'+sheet0.id)
      .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.sheetId).toBe(sheet0.id);
    });

    it('/api/order/sheetid/{:sheetID} (GET) null', async () => {
      const res = await request(app.getHttpServer())
      .get('/api/order/sheetid/'+sheet0.id)
      .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toStrictEqual({});
    });

    it('/api/order/sheetid/{:sheetID} (GET) invalid sheet', async () => {
      const res = await request(app.getHttpServer())
      .get('/api/order/sheetid/0')
      .send();
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toBe("Unknown sheet");
    });

    it('/api/order/answerid/{:answerID} (GET)', async () => {
      var dto = Object.assign({}, testordertemp);
      dto.sheetid = sheet0.id;
      dto.answerid = answer.id;
      await request(app.getHttpServer())
        .post('/api/order/create')
        .send(dto);
      const order = (await request(app.getHttpServer())
      .get('/api/order/sheetid/'+sheet0.id)
      .send()).body;
      const res = await request(app.getHttpServer())
      .get('/api/order/answerid/'+answer.id)
      .send();
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body).toStrictEqual(order);
    });
  });

  afterEach(async () => {
    await clearDb(app);
    await app.close();
  });
});
