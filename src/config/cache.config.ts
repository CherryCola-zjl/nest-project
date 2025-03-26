import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export const getCacheConfig = (configService: ConfigService): CacheModuleOptions => ({
  store: require('cache-manager-redis-store'),
  host: configService.get('redis.host'),
  port: configService.get('redis.port'),
  ttl: 60 * 60 * 24, // 24小时
  max: 100, // 最大缓存条目数
}); 