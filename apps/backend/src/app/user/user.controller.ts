import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('users')
  async createUser(
    @Body() body: { name: string; email: string; age?: number },
  ) {
    return this.userService.createUser(body.name, body.email, body.age);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(id, updateData);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
