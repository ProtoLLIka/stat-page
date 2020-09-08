import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDate(): string {
    return (new Date).toString();
  }
}
