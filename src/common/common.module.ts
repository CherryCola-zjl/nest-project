import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './services/cache.service';
import { LoggerService } from './services/logger.service';
import { ElkLoggerService } from './services/elk-logger.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { elkConfig } from '../config/elk.config';

@Module({
  imports: [
    ElasticsearchModule.register(elkConfig),
    CacheModule.register({
      ttl: 60 * 60 * 24, // 默认缓存时间为24小时
      max: 100, // 最大缓存项数
    }),
  ],
  providers: [
    LoggerService, 
    ElkLoggerService,
    CacheService,
  ],
  exports: [
    LoggerService, 
    ElkLoggerService,
    CacheService,
  ],
})
export class CommonModule {}