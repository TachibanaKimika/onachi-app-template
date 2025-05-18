import express from 'express';
import { Ready } from './utils/Ready';
import { setupUploadRoutes } from './api';
import path from 'path';
import logger from './utils/logger';
import { timing } from './middlewares/timing';
import { responseWrapper } from './middlewares/responseWrapper';

class Bootstrap {
  readonly app: Ready<express.Express> = new Ready<express.Express>();

  async bootstrap() {
    const app = express();
    app.use(express.json({ limit: '5000mb' }));
    app.use(express.urlencoded({ extended: true, limit: '5000mb' }));
    app.use(responseWrapper);
    app.use(timing);

    if (!process.env.__DEV__) {
      app.use('/', express.static(path.join(__dirname, './web')));
    }

    setupUploadRoutes(app);

    app.listen(24500, () => {
      logger.info('Server running on port 24500');
    });

    this.app.toBeReady(app);
  }
}

export default new Bootstrap();
