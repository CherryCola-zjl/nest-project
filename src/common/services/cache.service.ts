// 修改导入，从 @nestjs/cache-manager 导入 CACHE_MANAGER
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(
      key,
      value,
      ttl || this.configService.get('cache.ttl'),
    );
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    // 使用 del 方法删除所有缓存，或者根据您的需求实现清除缓存的逻辑
    // 这里可能需要根据您的实际需求调整
    // 例如，您可能需要获取所有键并逐个删除
    // 或者使用 Redis 客户端的 flushall 命令
    console.warn(
      'Cache reset method called, but implementation may need adjustment',
    );
    // 如果您使用 Redis，可以考虑直接访问 Redis 客户端
    // const redisClient = (this.cacheManager as any).store.getClient();
    // await redisClient.flushall();
  }
}
