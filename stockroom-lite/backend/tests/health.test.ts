import request from 'supertest';

describe('Health endpoint', () => {
  beforeAll(() => {
    process.env.DATABASE_URL = '******localhost:3306/stockroom_lite';
    process.env.JWT_ACCESS_SECRET = 'test_access_secret_12345';
    process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_12345';
  });

  it('returns 200 and status ok', async () => {
    const { createApp } = await import('../src/app');
    const res = await request(createApp()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
