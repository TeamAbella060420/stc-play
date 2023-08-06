import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string, status: number, description: string } {
    return { message: 'Welcome to GraphQL BFF', status: HttpStatus.OK, description: 'Health check' };
  }
}