import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(lang: string): string {
    return `<h1 style="color:red;">${lang}</h1>`;
  }
}
