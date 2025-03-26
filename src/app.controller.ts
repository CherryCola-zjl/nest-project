import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('hello')
  getHello(@Headers('accept-language') lang: string): string {
    console.log('getHello', lang);
    return this.appService.getHello(lang);
  }
}
