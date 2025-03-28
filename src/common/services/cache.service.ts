// 修改导入，从 @nestjs/cache-manager 导入 CACHE_MANAGER
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl || this.configService.get('cache.ttl'));
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    console.warn('Cache reset method called, but implementation may need adjustment');
    // 如果您使用 Redis，可以考虑直接访问 Redis 客户端
    // const redisClient = (this.cacheManager as any).store.getClient();
    // await redisClient.flushall();
  }
}
