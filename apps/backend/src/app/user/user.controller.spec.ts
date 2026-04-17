import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    getUsers: jest.fn().mockResolvedValue([]),
    getUserById: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockResolvedValue({ id: '1', name: 'Test User' }),
    updateUser: jest.fn().mockResolvedValue({ id: '1', name: 'Updated User' }),
    deleteUser: jest.fn().mockResolvedValue({ id: '1' }),
    login: jest.fn().mockResolvedValue({ accessToken: 'jwt-token' }),
    changePassword: jest
      .fn()
      .mockResolvedValue({ message: 'Password changed successfully' }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a users list', async () => {
    await expect(controller.getUsers()).resolves.toEqual([]);
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it('should create a new user', async () => {
    await expect(
      controller.createUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'strongPassword123',
      }),
    ).resolves.toEqual({ id: '1', name: 'Test User' });
    expect(mockUserService.createUser).toHaveBeenCalledWith(
      'Test User',
      'test@example.com',
      undefined,
      'strongPassword123',
    );
  });

  it('should reject invalid user payloads', async () => {
    await expect(
      controller.createUser({ name: '', email: 'not-an-email', age: -1 }),
    ).rejects.toThrow('Invalid user payload');
    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });

  it('should require a password when creating a user', async () => {
    await expect(
      controller.createUser({ name: 'Test User', email: 'test@example.com' }),
    ).rejects.toThrow('Invalid user payload');
    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });

  it('should login a user with valid credentials', async () => {
    await expect(
      controller.login({
        email: 'test@example.com',
        password: 'strongPassword123',
      }),
    ).resolves.toEqual({ accessToken: 'jwt-token' });
    expect(mockUserService.login).toHaveBeenCalledWith(
      'test@example.com',
      'strongPassword123',
    );
  });

  it('should reject invalid login payloads', async () => {
    await expect(controller.login({ email: 'bad-email' })).rejects.toThrow(
      'Invalid login payload',
    );
    expect(mockUserService.login).not.toHaveBeenCalled();
  });

  it('should change password with a valid payload', async () => {
    await expect(
      controller.changePassword('Bearer jwt-token', {
        currentPassword: 'oldPassword123',
        newPassword: 'newPassword123',
      }),
    ).resolves.toEqual({ message: 'Password changed successfully' });
    expect(mockUserService.changePassword).toHaveBeenCalledWith(
      'Bearer jwt-token',
      'oldPassword123',
      'newPassword123',
    );
  });

  it('should reject invalid change password payloads', async () => {
    await expect(
      controller.changePassword('Bearer jwt-token', {
        currentPassword: 'short',
      }),
    ).rejects.toThrow('Invalid change password payload');
    expect(mockUserService.changePassword).not.toHaveBeenCalled();
  });

  it('should reject invalid user ids when fetching by id', async () => {
    await expect(controller.getUserById('invalid-id')).rejects.toThrow(
      'Invalid user id',
    );
    expect(mockUserService.getUserById).not.toHaveBeenCalled();
  });

  it('should reject invalid user ids when updating', async () => {
    await expect(
      controller.updateUser('invalid-id', { name: 'Updated User' }),
    ).rejects.toThrow('Invalid user id');
    expect(mockUserService.updateUser).not.toHaveBeenCalled();
  });

  it('should reject missing user ids when deleting', async () => {
    await expect(controller.deleteUser(undefined as never)).rejects.toThrow(
      'Invalid user id',
    );
    expect(mockUserService.deleteUser).not.toHaveBeenCalled();
  });
});
