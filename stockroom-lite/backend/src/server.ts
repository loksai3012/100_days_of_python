import { env } from './config/env';
import { logger } from './config/logger';
import { createApp } from './app';

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`Stockroom Lite backend running on port ${env.PORT}`);
});
