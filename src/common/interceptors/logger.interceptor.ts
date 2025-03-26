import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'];

    // 记录请求日志
    this.logger.logRequest(request, 'HTTP');

    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (response) => {
          // 记录响应日志
          this.logger.logResponse(response, 'HTTP');
          this.logger.info(
            `${method} ${url} ${response.statusCode} ${Date.now() - now}ms`,
            'HTTP',
            {
              ip,
              userAgent,
            },
          );
        },
        error: (error) => {
          // 记录错误日志
          this.logger.logError(error, 'HTTP');
          this.logger.error(
            `${method} ${url} ${error.status || 500} ${Date.now() - now}ms`,
            error.stack,
            'HTTP',
          );
        },
      }),
    );
  }
} 