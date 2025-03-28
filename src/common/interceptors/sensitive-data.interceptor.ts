import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SensitiveDataInterceptor implements NestInterceptor {
  private readonly sensitiveFields = ['password', 'salt', 'secretKey'];

  private removeSensitiveData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveData(item));
    }

    if (data && typeof data === 'object') {
      const cleanedData = { ...data };
      this.sensitiveFields.forEach((field) => {
        delete cleanedData[field];
      });
      return cleanedData;
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return data;
        return this.removeSensitiveData(data);
      })
    );
  }
}
