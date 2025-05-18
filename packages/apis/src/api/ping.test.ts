import { describe, it, expect } from 'vitest';

import { ping } from './ping';

describe('ping', () => {
  it('should return a ping response', async () => {
    const response = await ping();
    expect(response).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
    });
  });

  it('should return a timestamp in ISO format', async () => {
    const response = await ping();
    const timestamp = new Date(response.timestamp);
    expect(timestamp.toISOString()).toBe(response.timestamp);
  });
});
