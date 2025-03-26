import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

export function Cache(ttl?: number) {
  return applyDecorators(
    SetMetadata('cache_module:cache_ttl', ttl || 60 * 60 * 24), // 默认24小时
    UseInterceptors(CacheInterceptor),
  );
}
