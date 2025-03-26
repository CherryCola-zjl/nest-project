import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerService } from './logger.service';

@Injectable()
export class ElkLoggerService {
  private readonly indexPrefix = 'nest-logs';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly logger: LoggerService,
  ) {}

  async logToElk(logData: any) {
    try {
      const index = `${this.indexPrefix}-${new Date().toISOString().split('T')[0]}`;
      
      await this.elasticsearchService.index({
        index,
        document: {
          ...logData,
          '@timestamp': new Date().toISOString(),
        },
      });
    } catch (error) {
      this.logger.error('Failed to log to Elasticsearch', error.stack, 'ElkLoggerService');
    }
  }

  async searchLogs(query: any) {
    try {
      const index = `${this.indexPrefix}-*`;
      const result = await this.elasticsearchService.search({
        index,
        ...query,
      });
      return result;
    } catch (error) {
      this.logger.error('Failed to search logs in Elasticsearch', error.stack, 'ElkLoggerService');
      throw error;
    }
  }

  async createIndexTemplate() {
    try {
      const templateName = `${this.indexPrefix}-template`;
      await this.elasticsearchService.indices.putTemplate({
        name: templateName,
        body: {
          index_patterns: [`${this.indexPrefix}-*`],
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
          },
          mappings: {
            properties: {
              '@timestamp': { type: 'date' },
              level: { type: 'keyword' },
              message: { type: 'text' },
              context: { type: 'keyword' },
              method: { type: 'keyword' },
              url: { type: 'keyword' },
              statusCode: { type: 'integer' },
              duration: { type: 'long' },
              ip: { type: 'ip' },
              userAgent: { type: 'keyword' },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Failed to create index template', error.stack, 'ElkLoggerService');
      throw error;
    }
  }
} 