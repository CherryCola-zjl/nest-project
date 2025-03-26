import { ElasticsearchModuleOptions } from '@nestjs/elasticsearch';

export const elkConfig: ElasticsearchModuleOptions = {
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || 'changeme',
  },
  maxRetries: 3,
  requestTimeout: 30000,
  pingTimeout: 3000,
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  }
}; 