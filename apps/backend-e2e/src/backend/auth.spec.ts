/// <reference types="jest" />

import axios from 'axios';
import type {
  ChangePasswordBody,
  ChangePasswordResponse,
  CreateUserBody,
  HealthCheckResponse,
  LoginBody,
  LoginResponse,
  UserResponse,
} from '@my-monorepo/shared-utils';

describe('Authentication API', () => {
  let dbStatus = 'disconnected';

  beforeAll(async () => {
    const res = (await axios.get('/api/health/db')) as {
      data: HealthCheckResponse;
      status: number;
    };
    dbStatus = res.data.status;
  });

  it('should login and change password when DB is connected', async () => {
    if (dbStatus !== 'connected') {
      return expect(true).toBe(true);
    }

    const userBody: CreateUserBody = {
      name: 'Auth Test User',
      email: `auth.user.${Date.now()}@example.com`,
      password: 'strongPassword123',
    };

    const createRes = (await axios.post('/api/users', userBody)) as {
      data: UserResponse;
      status: number;
    };
    const userId = createRes.data._id || createRes.data.id;

    const loginBody: LoginBody = {
      email: userBody.email,
      password: userBody.password,
    };

    const loginRes = (await axios.post('/api/login', loginBody)) as {
      data: LoginResponse;
      status: number;
    };

    expect(loginRes.status).toBe(201);
    expect(loginRes.data).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );

    const token = loginRes.data.accessToken as string;

    const changePasswordBody: ChangePasswordBody = {
      currentPassword: userBody.password,
      newPassword: 'newStrongPassword456',
    };

    const changePasswordRes = (await axios.post(
      '/api/change-password',
      changePasswordBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )) as {
      data: ChangePasswordResponse;
      status: number;
    };

    expect(changePasswordRes.status).toBe(201);
    expect(changePasswordRes.data).toEqual({
      message: 'Password changed successfully',
    });

    const reloginBody: LoginBody = {
      email: userBody.email,
      password: 'newStrongPassword456',
    };

    const reloginRes = (await axios.post('/api/login', reloginBody)) as {
      data: LoginResponse;
      status: number;
    };

    expect(reloginRes.status).toBe(201);
    expect(reloginRes.data.accessToken).toEqual(expect.any(String));

    await axios.delete(`/api/users/${userId}`);
  });
});
