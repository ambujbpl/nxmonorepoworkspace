import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

describe('AppController', () => {
  let app: TestingModule;
  const mockUserService = {
    checkMongoDBConnection: jest.fn().mockResolvedValue({
      status: 'connected',
      message: 'Connected to MongoDB',
      userCount: 0,
    }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('checkDB', () => {
    it('should return MongoDB connection status', async () => {
      const appController = app.get<AppController>(AppController);

      const result = await appController.checkDB();
      expect(result).toEqual(
        expect.objectContaining({
          status: 'connected',
          message: 'Connected to MongoDB',
          userCount: 0,
        }),
      );
      expect(mockUserService.checkMongoDBConnection).toHaveBeenCalled();
    });
  });
});
