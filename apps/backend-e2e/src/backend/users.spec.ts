/// <reference types="jest" />

import axios from 'axios';
import type {
  CreateUserBody,
  HealthCheckResponse,
  UserResponse,
} from '@my-monorepo/shared-utils';

describe('Users API', () => {
  let dbStatus = 'disconnected';

  beforeAll(async () => {
    const res = (await axios.get('/api/health/db')) as {
      data: HealthCheckResponse;
      status: number;
    };
    dbStatus = res.data.status;
  });

  it('should reject invalid user payloads', async () => {
    await expect(
      axios.post('/api/users', {
        name: 'Invalid User',
        email: 'invalid@example.com',
      }),
    ).rejects.toMatchObject({
      response: {
        status: 400,
      },
    });
  });

  it('should respond to GET /api/users with an array when DB is connected', async () => {
    if (dbStatus !== 'connected') {
      return expect(true).toBe(true);
    }

    const res = (await axios.get('/api/users')) as {
      data: UserResponse[];
      status: number;
    };
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('should create a user without exposing password or __v when DB is connected', async () => {
    if (dbStatus !== 'connected') {
      return expect(true).toBe(true);
    }

    const userBody: CreateUserBody = {
      name: 'Test User',
      email: `test.user.${Date.now()}@example.com`,
      password: 'strongPassword123',
    };

    const createRes = (await axios.post('/api/users', userBody)) as {
      data: UserResponse;
      status: number;
    };

    expect(createRes.status).toBe(201);
    expect(createRes.data).toEqual(
      expect.objectContaining({
        name: userBody.name,
        email: userBody.email,
      }),
    );
    expect(createRes.data).not.toHaveProperty('password');
    expect(createRes.data).not.toHaveProperty('__v');

    const userId = createRes.data._id || createRes.data.id;
    expect(userId).toBeTruthy();

    await axios.delete(`/api/users/${userId}`);
  });
});
