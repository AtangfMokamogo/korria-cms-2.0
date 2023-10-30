import { getAllUsers, getAllOrders } from "../src/controllers/resolverHandlers.js";
jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');
  return {
    ...mongoose,
    model: jest.fn((modelName) => {
      switch (modelName) {
        case 'User':
          return {
            find: jest.fn().mockResolvedValue([{ id: "nosndonwskdnwkjnd", fullname: 'Test User', email: 'test@example.com', password:"ondiundinbidnbi" }])
          };
        case 'Order':
          return {
            find: jest.fn().mockResolvedValue([{ id: "orderId123", product: 'Test Product', quantity: 2 }])
          };
        case 'Project':
          return {
            find: jest.fn().mockResolvedValue([{ id: "lhdlshlsdkh", title: "pjdoiodsnd"}])
          };
        case 'Parcel':
          return {
            find: jest.fn().mockResolvedValue([{id: "lhdslhdlsh", title: "iuscbhiudci" }])
          };
        case 'Text':
          return {
            find: jest.fn().mockResolvedValue([{ id: "lshdlkshdsk", title: "payload", payload: "iuahduihis" }])
          };
        case 'Image':
          return {
            find: jest.fn().mockResolvedValue([{ id: "orderId123", title: "imljlkj", src: "alghdjak", alt: "lahdkjahkjdhks", copyright: "lskgdhgdkjh" }])
          };
        default:
          throw new Error(`No mock defined for model "${modelName}"`);
      }
    })
  };
});

describe('getAllUsers function', () => {
  it('should return all users', async () => {
    const users = await getAllUsers();
    expect(users).toEqual([{ id: "nosndonwskdnwkjnd", fullname: 'Test User', email: 'test@example.com', password:"ondiundinbidnbi" }]);
  });
});

describe('getAllOrders function', () => {
  it('should return all orders', async () => {
    const orders = await getAllOrders();
    expect(orders).toEqual([{ id: "orderId123", product: 'Test Product', quantity: 2 }]);
  });
});
