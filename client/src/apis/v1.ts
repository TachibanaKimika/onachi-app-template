import request from '~/utils/request';
import type { v1 as V1Type } from '@packages/apis/typings';

const createV1Api = () => {
  const handler = {
    get(target: unknown, key: string) {
      return async (params: object) => {
        const url = `/api/v1/${key}`;
        return request(url, params);
      };
    },
  };

  return new Proxy({}, handler) as typeof V1Type;
};

const v1 = createV1Api();

export default v1;
