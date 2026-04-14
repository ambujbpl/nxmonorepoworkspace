import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('health/db')
  async checkDB() {
    return this.userService.checkMongoDBConnection();
  }
}
