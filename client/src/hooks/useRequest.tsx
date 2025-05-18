import { useState, useCallback, useMemo, useEffect } from 'react';
import request from '~/utils/request';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface UseRequestResult<T, P extends object = object> {
  /**
   * 执行异步请求的方法
   */
  execute: (params?: P) => Promise<T>;
  /**
   * 请求状态
   */
  status: RequestStatus;
  /**
   * 请求是否处于加载状态
   */
  loading: boolean;
  /**
   * 请求返回的数据
   */
  data: T | null;
  /**
   * 请求错误信息
   */
  error: Error | null;
  /**
   * 重置状态
   */
  reset: () => void;
  /**
   * 替代组件，用于在请求失败或加载中时显示
   */
  replacement: JSX.Element | null;
}

type AsyncFunction<P, T> = (params: P) => Promise<T> | T;

interface UseRequestOptions {
  executeNow?: boolean | object;
}

const hashFn = (fn: Function | string) => {
  if (typeof fn === 'string') {
    return fn;
  }
  return fn.toString();
};

/**
 * 请求 Hook，用于处理异步请求
 * @param apiOrFn 异步函数或API路径
 * @returns {UseRequestResult} 请求结果和控制方法
 */
function useRequest<T, P extends object = object>(
  apiOrFn: string | AsyncFunction<P, T>,
  opt?: UseRequestOptions,
): UseRequestResult<T, P> {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [executeOptions] = useState<UseRequestOptions['executeNow']>(opt?.executeNow || false);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  const execute = useCallback(
    async (params: P = {} as P): Promise<T> => {
      setStatus('loading');
      setError(null);

      try {
        let result: T;

        if (typeof apiOrFn === 'string') {
          // 如果传入的是 API 路径，使用 request 函数发送请求
          result = await request<P, T>(apiOrFn, params);
        } else {
          // 如果传入的是函数，直接调用
          result = await apiOrFn(params);
        }

        setData(result);
        setStatus('success');
        return result;
      } catch (err) {
        const errorObject = err instanceof Error ? err : new Error(String(err));
        setError(errorObject);
        setStatus('error');
        setData(null);
        throw errorObject;
      }
    },
    [hashFn(apiOrFn)],
  );

  const replacement = useMemo(() => {
    if (error) {
      return <div className='p-4 mb-6 bg-red-100 text-red-700 rounded-md'>加载数据失败: {error.message}</div>;
    }
    if (status === 'loading') {
      return <div className='text-gray-500'>加载中...</div>;
    }

    return null;
  }, [error, status]);

  useEffect(() => {
    if (executeOptions) {
      const params = typeof executeOptions === 'object' ? (executeOptions as P) : ({} as P);
      execute(params);
    }
  }, [execute, executeOptions]);

  return {
    execute,
    status,
    loading: status === 'loading',
    data,
    error,
    reset,
    replacement,
  };
}

export default useRequest;
