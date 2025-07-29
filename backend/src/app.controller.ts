import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get("/hello")
  getHello(): {data: string} {
    const hello = this.appService.getHello()
    return {data: hello};
  }
}
