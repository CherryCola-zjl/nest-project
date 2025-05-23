import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse> {
    return next.handle().pipe(
      map((data) => {
        // 如果返回的数据已经是标准格式，则直接返回
        if (data && data.code !== undefined && data.message !== undefined) {
          return data;
        }

        // 否则，将数据包装成标准格式
        return {
          code: 200,
          message: '请求成功',
          data: data,
        };
      })
    );
  }
}
