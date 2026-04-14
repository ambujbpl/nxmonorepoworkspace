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
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
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
      controller.createUser({ name: 'Test User', email: 'test@example.com' }),
    ).resolves.toEqual({ id: '1', name: 'Test User' });
    expect(mockUserService.createUser).toHaveBeenCalledWith(
      'Test User',
      'test@example.com',
      undefined,
    );
  });
});
