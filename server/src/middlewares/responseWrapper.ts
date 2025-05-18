import { Request, Response, NextFunction } from 'express';

export function responseWrapper(req: Request, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (body: unknown) {
    // 如果已经是标准格式则直接返回
    if (body && typeof body === 'object' && 'code' in body) {
      return originalJson.call(this, body);
    }

    // 包装响应数据
    return originalJson.call(this, {
      code: 0,
      message: 'success',
      data: body,
    });
  };
  next();
}
