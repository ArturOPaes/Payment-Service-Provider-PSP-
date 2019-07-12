/* eslint-disable no-undef */
import Service from '../../src/app/services/index';

describe('Methods services', () => {
  it('should return last 4 characters', () => {
    const rate = Service.lastCardNumbers('0000000000001234');
    expect(rate).toEqual('1234');
  });

  it('should return value - 3%', () => {
    const rate = Service.discountFee(10, 3);
    expect(rate).toEqual(9.7);
  });
});
