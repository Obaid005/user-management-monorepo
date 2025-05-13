import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

describe('AppModule', () => {
  let module: TestingModule;
  let configService: ConfigService;

  beforeAll(async () => {
    // Mock environment variable
    process.env.MONGO_URI = 'mongodb://localhost:27017/test';

    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  afterAll(() => {
    delete process.env.MONGO_URI;
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ConfigModule', () => {
    const configModule = module.get(ConfigModule);
    expect(configModule).toBeDefined();
  });

  it('should have UsersModule', () => {
    const usersModule = module.get(UsersModule);
    expect(usersModule).toBeDefined();
  });

  it('should have MongooseModule', () => {
    const mongooseModule = module.get(MongooseModule);
    expect(mongooseModule).toBeDefined();
  });

  it('should provide the correct MongoDB URI', () => {
    expect(configService.get('MONGO_URI')).toBe('mongodb://localhost:27017/test');
  });
}); 