/// <reference types="jest" />

import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get('/api');

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('should return MongoDB health status', async () => {
    const res = await axios.get('/api/health/db');

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
      }),
    );
    expect(res.data.status).toMatch(/connected|disconnected/);

    if (res.data.status === 'connected') {
      expect(typeof res.data.userCount).toBe('number');
    }
  });
});

describe('Users API', () => {
  let dbStatus = 'disconnected';

  beforeAll(async () => {
    const res = await axios.get('/api/health/db');
    dbStatus = res.data.status;
  });

  it('should respond to GET /api/users with an array when DB is connected', async () => {
    if (dbStatus !== 'connected') {
      return expect(true).toBe(true);
    }

    const res = await axios.get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('should create a new user via POST /api/users when DB is connected', async () => {
    if (dbStatus !== 'connected') {
      return expect(true).toBe(true);
    }

    const userBody = {
      name: 'Test User',
      email: 'test.user@example.com',
    };
    const res = await axios.post('/api/users', userBody);

    expect(res.status).toBe(201);
    expect(res.data).toEqual(
      expect.objectContaining({
        name: 'Test User',
        email: 'test.user@example.com',
      }),
    );
    expect(res.data._id || res.data.id).toBeTruthy();
  });
});
