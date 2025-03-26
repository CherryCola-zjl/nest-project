import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('NestJS API 文档')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 