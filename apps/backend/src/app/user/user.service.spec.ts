import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  const mockUserModel = {
    find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    countDocuments: jest.fn().mockResolvedValue(0),
    save: jest.fn().mockResolvedValue(null),
  };

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
    mockUserModel.countDocuments.mockRejectedValue(new Error('connection failed'));

    const result = await service.checkMongoDBConnection();

    expect(result).toEqual({
      status: 'disconnected',
      message: 'MongoDB connection failed: connection failed',
    });
  });
});
