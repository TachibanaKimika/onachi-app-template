import express from 'express';
import logger from '~/utils/logger';

interface LoadApiOptions {
  app: express.Express;
  apis: Record<string, Function>;
  path: string;
}

const loadApi = ({ app, apis, path }: LoadApiOptions) => {
  if (!path) {
    logger.error('API path is required');
    return;
  }
  if (!apis) {
    logger.error('API is required');
    return;
  }
  const formattedPath = path.replace(/^\//, '');
  Object.entries(apis).forEach(([key, api]) => {
    const routePath = `/api/${formattedPath}/${key}`;
    logger.info(`Loading API: ${key}`);
    app.post(routePath, async (req, res) => {
      const response = await api(req.body, req);
      res.status(200).json(response);
    });
  });
};

export default loadApi;
