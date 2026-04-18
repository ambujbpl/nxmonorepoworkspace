import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  changePasswordSchema,
  loginUserSchema,
  objectIdParamSchema,
  postUserSchema,
  putUserSchema,
  type ChangePasswordBody,
  type CreateUserBody,
  type LoginBody,
  type ObjectIdParams,
  type PutUserBody,
  validateBody,
} from '@my-monorepo/shared-utils';
import { UserService } from './user.service';
import { User } from '../schema/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    validateBody<ObjectIdParams>(objectIdParamSchema, { id }, 'Invalid user id');
    return this.userService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() body: unknown) {
    validateBody<CreateUserBody>(postUserSchema, body);
    return this.userService.createUser(body.name, body.email, body.age, body.password);
  }

  @Post('login')
  async login(@Body() body: unknown) {
    validateBody<LoginBody>(loginUserSchema, body, 'Invalid login payload');
    return this.userService.login(body.email, body.password);
  }

  @Post('change-password')
  async changePassword(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: unknown,
  ) {
    validateBody<ChangePasswordBody>(
      changePasswordSchema,
      body,
      'Invalid change password payload',
    );

    return this.userService.changePassword(
      authorization,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: unknown) {
    validateBody<ObjectIdParams>(objectIdParamSchema, { id }, 'Invalid user id');
    validateBody<PutUserBody>(putUserSchema, updateData);
    return this.userService.updateUser(id, updateData as Partial<User>);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    validateBody<ObjectIdParams>(objectIdParamSchema, { id }, 'Invalid user id');
    return this.userService.deleteUser(id);
  }
}
