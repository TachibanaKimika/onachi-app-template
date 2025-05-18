/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { ensureDirSync } from 'fs-extra';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 确保日志目录存在
const logDir = path.join(__dirname, '../../logs');
ensureDirSync(logDir);

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()} ${message}`;
});

const pathRegex =
  /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
const extractPathRegex = /\s+at.*[(\s](.*)\)?/;
function format(args: any): string {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    let a = args[i];

    if (a instanceof Error) {
      // eslint-disable-next-line prefer-rest-params
      const array = Array.prototype.slice.call(arguments) as any[];
      if (a.stack) {
        const cwd = process.cwd().replace(/\\/g, '/');
        array[0] = a.stack
          .replace(/\\/g, '/')
          .split('\n')
          .map((l) => l.replace('file://', '').replace(cwd, ''))
          .filter((line) => {
            // clean stack 过滤多余的堆栈信息
            const pathMatches = line.match(extractPathRegex);
            if (pathMatches === null || !pathMatches[1]) {
              return true;
            }
            const match = pathMatches[1];
            return !pathRegex.test(match);
          })
          .filter((line) => line.trim() !== '')
          .join('\n');
      } else {
        array[0] = a.stack;
      }

      a = format(array);
    } else if (typeof a === 'object') {
      try {
        a = JSON.stringify(a);
      } catch (e) {}
    } else if (typeof a === 'symbol') {
      try {
        a = a.toString();
      } catch (e) {}
    }

    result += (i > 0 ? ' ' : '') + a;
  }

  return result;
}

const wintonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    // 写入所有日志到 `logs/combined.log`
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // 写入错误日志到 `logs/error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // 开发环境下在控制台输出
    new winston.transports.Console({
      //   format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

const logger = {
  info: (...args: any[]) => {
    const message = format(args);
    wintonLogger.info(message);
  },
  error: (...args: any[]) => {
    const message = format(args);
    wintonLogger.error(message);
  },
  warn: (...args: any[]) => {
    const message = format(args);
    wintonLogger.warn(message);
  },
  debug: (...args: any[]) => {
    const message = format(args);
    wintonLogger.debug(message);
  },
  verbose: (...args: any[]) => {
    const message = format(args);
    wintonLogger.verbose(message);
  },
};

export default logger;
