import donenv from 'dotenv'
donenv.config()
import config from './property';
import app from './app';
import logger from './core/logger';
app
  .listen(config.port, () => {
    logger.info(`server running on port : ${config.port}`);
  })
  .on('error', (e) => logger.error(e));

