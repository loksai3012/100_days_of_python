import request from 'supertest';
import { createApp } from '../src/app';

describe('Health endpoint', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(createApp()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
