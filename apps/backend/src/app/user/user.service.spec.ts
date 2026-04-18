import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from '../schema/user.schema';

describe('UserService', () => {
  let service: UserService;
  const saveMock = jest.fn().mockImplementation(function (this: Record<string, unknown>) {
    return Promise.resolve({ ...this });
  });
  const mockUserModel = Object.assign(
    jest.fn().mockImplementation(function (this: Record<string, unknown>, data: Record<string, unknown>) {
      Object.assign(this, data);
      this.save = saveMock;
    }),
    {
      find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
      findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      countDocuments: jest.fn().mockResolvedValue(0),
    },
  );

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return MongoDB connection status when connected', async () => {
    mockUserModel.countDocuments.mockResolvedValue(5);

    const result = await service.checkMongoDBConnection();

    expect(result).toEqual({
      status: 'connected',
      message: 'Connected to MongoDB',
      userCount: 5,
    });
  });

  it('should return disconnected status on connection failure', async () => {
    mockUserModel.countDocuments.mockRejectedValue(
      new Error('connection failed'),
    );

    const result = await service.checkMongoDBConnection();

    expect(result).toEqual({
      status: 'disconnected',
      message: 'MongoDB connection failed: connection failed',
    });
  });

  it('should not return the password when creating a user', async () => {
    const createdUser = await (service as unknown as {
      createUser: (
        name: string,
        email: string,
        age: number | undefined,
        password: string,
      ) => Promise<{ password?: string; email: string; name: string; age?: number }>;
    }).createUser('Test User', 'test@example.com', 25, 'plainPassword123');

    expect(createdUser.name).toBe('Test User');
    expect(createdUser.email).toBe('test@example.com');
    expect(createdUser.age).toBe(25);
    expect(createdUser.password).toBeUndefined();
  });

  it('should throw a duplicate email error when email already exists', async () => {
    saveMock.mockRejectedValueOnce({ code: 11000 });

    await expect(
      (service as unknown as {
        createUser: (
          name: string,
          email: string,
          age: number | undefined,
          password: string,
        ) => Promise<unknown>;
      }).createUser('Test User', 'test@example.com', 25, 'plainPassword123'),
    ).rejects.toThrow('Email test@example.com already exists');
  });

  it('should throw when user id is not found', async () => {
    await expect(service.getUserById('missing-id')).rejects.toThrow(
      'User with id missing-id not found in DB',
    );
  });

  it('should throw when updating a missing user id', async () => {
    await expect(
      service.updateUser('missing-id', { name: 'Updated User' }),
    ).rejects.toThrow('User with id missing-id not found in DB');
  });

  it('should throw when deleting a missing user id', async () => {
    await expect(service.deleteUser('missing-id')).rejects.toThrow(
      'User with id missing-id not found in DB',
    );
  });
});
