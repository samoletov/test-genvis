import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import * as createData from '../test/data/create.json';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/matches (POST)', () => {
    return request(app.getHttpServer()).post('/matches').send(createData).expect(201);
  });

  it('/matches/:id (POST)', async () => {
    const createResult = await request(app.getHttpServer()).post('/matches').send(createData);
    const gameId = createResult.body.gameId;
    const pointResult = await request(app.getHttpServer()).post(`/matches/${gameId}`).send({
      gameId: gameId,
      point: 'p1',
    });
    console.log(pointResult);
  });
});
