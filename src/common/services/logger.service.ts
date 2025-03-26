import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  // 敏感信息字段
  private readonly sensitiveFields = [
    'password',
    'token',
    'accessToken',
    'refreshToken',
    'authorization',
    'cookie',
    'creditCard',
    'ssn',
    'phone',
    'email',
  ];

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // 过滤敏感信息
  private sanitizeData(data: any): any {
    if (!data) return data;

    if (typeof data === 'object') {
      const sanitized = { ...data };
      for (const key in sanitized) {
        if (this.sensitiveFields.includes(key.toLowerCase())) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object') {
          sanitized[key] = this.sanitizeData(sanitized[key]);
        }
      }
      return sanitized;
    }

    return data;
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }

  // 自定义日志方法
  info(message: string, context?: string, meta?: any) {
    const sanitizedMeta = this.sanitizeData(meta);
    this.logger.info(message, { context, ...sanitizedMeta });
  }

  // 请求日志
  logRequest(request: any, context?: string) {
    const { method, url, ip, headers } = request;
    const sanitizedHeaders = this.sanitizeData(headers);
    
    this.logger.info('Incoming Request', {
      context,
      method,
      url,
      ip,
      headers: sanitizedHeaders,
    });
  }

  // 响应日志
  logResponse(response: any, context?: string) {
    const { statusCode, headers } = response;
    const sanitizedHeaders = this.sanitizeData(headers);
    
    this.logger.info('Outgoing Response', {
      context,
      statusCode,
      headers: sanitizedHeaders,
    });
  }

  // 错误日志
  logError(error: Error, context?: string) {
    const sanitizedError = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
    
    this.logger.error(error.message, {
      context,
      ...this.sanitizeData(sanitizedError),
    });
  }

  // 性能日志
  logPerformance(operation: string, duration: number, context?: string) {
    this.logger.info(`Performance: ${operation}`, {
      context,
      duration,
      timestamp: new Date().toISOString(),
    });
  }

  // 安全日志
  logSecurity(event: string, details: any, context?: string) {
    this.logger.warn(`Security Event: ${event}`, {
      context,
      ...this.sanitizeData(details),
      timestamp: new Date().toISOString(),
    });
  }
}