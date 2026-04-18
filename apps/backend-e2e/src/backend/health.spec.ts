/// <reference types="jest" />

import axios from 'axios';
import type {
  ApiMessageResponse,
  HealthCheckResponse,
} from '@my-monorepo/shared-utils';

describe('Health API', () => {
  it('should return a message', async () => {
    const res = (await axios.get('/api')) as {
      data: ApiMessageResponse;
      status: number;
    };

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('should return MongoDB health status', async () => {
    const res = (await axios.get('/api/health/db')) as {
      data: HealthCheckResponse;
      status: number;
    };

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
