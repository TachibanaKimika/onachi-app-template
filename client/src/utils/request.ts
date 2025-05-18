import superagent from 'superagent';

const request = <D extends object, T>(api: string, data: D): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    superagent
      .post(api)
      .send(data)
      .set('Accept', 'application/json')
      .then((res) => {
        const { body } = res;
        if (body.code === 0) {
          resolve(body.data);
        } else {
          reject(new Error(body.message || body.code));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default request;
