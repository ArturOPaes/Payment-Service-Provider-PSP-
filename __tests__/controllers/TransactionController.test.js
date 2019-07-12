/* eslint-disable no-undef */
import supertest from 'supertest';
import Database from '../../src/database/index';
import app from '../../src/app';

const request = supertest(app);

describe('Tests transaction controller', () => {
  const uri = '/transactions';

  describe('findAll', () => {
    it('should have a status of 200', async () => {
      const res = await request.get(uri);
      expect(res.status).toEqual(200);
    });

    it('should not be null for the given request', async () => {
      const res = await request.get(uri);
      expect(res.body).not.toBeNull();
    });

    it('should have id as property', async () => {
      const res = await request.get(uri);
      expect(res.body[0]).toHaveProperty('id');
    });

    it('should have card_number as 4 of length', async () => {
      const res = await request.get(uri);
      expect(res.body[0].card_number).toHaveLength(4);
    });
  });

  describe('insert', () => {
    const wrongPaymentMethod = {
      value: 2,
      description: 'teste',
      payment_method: 'credebito_card',
      card_number: '0000000000000000',
      name_card_owner: 'teste',
      expiration_date_card: '0000',
      cvv_card: '123',
    };
    it('should return error for wrong payment_method', async () => {
      const res = await request.post(uri).set(wrongPaymentMethod);
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    const wrongLengthCardNumber = {
      value: 2,
      description: 'teste',
      payment_method: 'credit_card',
      card_number: '000000000000000', // 15 characteres
      name_card_owner: 'teste',
      expiration_date_card: '0000',
      cvv_card: '123',
    };
    it('should return error for wrong length of card_number', async () => {
      const res = await request.post(uri).set(wrongLengthCardNumber);
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });

    const withOutCvvCard = {
      value: 2,
      description: 'teste',
      payment_method: 'credit_card',
      card_number: '0000000000000000',
      name_card_owner: 'teste',
      expiration_date_card: '0000',
    };
    it('should return error for wrong length of cvv_card', async () => {
      const res = await request.post(uri).set(withOutCvvCard);
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
  afterAll(async () => {
    await Database.desconnect();
  });
});
