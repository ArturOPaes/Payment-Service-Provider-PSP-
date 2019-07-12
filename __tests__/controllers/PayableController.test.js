/* eslint-disable no-undef */
import supertest from 'supertest';
import Database from '../../src/database/index';
import app from '../../src/app';

const request = supertest(app);

describe('Tests payable controller', () => {
  const uri = '/payables';

  describe('findAll', () => {
    it('should have a status of 200', async () => {
      const res = await request.get(uri);
      expect(res.status).toEqual(200);
    });

    it('should not be null for the given request', async () => {
      const res = await request.get(uri);
      expect(res.body).not.toBeNull();
    });

    it('should have total_paid as property', async () => {
      const res = await request.get(uri);
      expect(res.body).toHaveProperty('total_paid');
    });

    it('should have total_waiting_funds as property', async () => {
      const res = await request.get(uri);
      expect(res.body).toHaveProperty('total_waiting_funds');
    });
  });

  afterAll(async () => {
    await Database.desconnect();
  });
});
