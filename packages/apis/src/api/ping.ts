export const ping = async () => {
  return new Promise<{ status: string; timestamp: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'ok',
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  });
};
