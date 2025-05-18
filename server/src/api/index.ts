import express from 'express';
import { v1 } from '@packages/apis';
import loadApi from '~/utils/loadApis';

export const setupUploadRoutes = (app: express.Express) => {
  loadApi({ app, path: '/v1', apis: v1 });
};
