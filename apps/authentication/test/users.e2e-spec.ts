import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../src/app.module';
import { RegisterUserDto, UserCommands, createPattern } from '@monorepo/common';
import { Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';

describe('UsersController (e2e)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;
  let mongoMemoryServer: MongoMemoryServer;
  let userId: string;

  beforeAll(async () => {
    // Create in-memory MongoDB server
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    // Create test module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => ({ MONGO_URI: uri })],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI'),
          }),
          inject: [ConfigService],
        }),
        ClientsModule.register([
          {
            name: 'USER_SERVICE',
            transport: Transport.TCP,
            options: {
              host: 'localhost',
              port: 3001,
            },
          },
        ]),
        AppModule,
      ],
    }).compile();

    // Start the NestJS app
    app = moduleFixture.createNestMicroservice({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
    await app.listen();

    // Get the client proxy
    client = moduleFixture.get<ClientProxy>('USER_SERVICE');
    await client.connect();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (client) {
      await client.close();
    }
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  });

  it('should register a new user', async () => {
    const dto: RegisterUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    const response = await firstValueFrom(
      client.send(createPattern(UserCommands.REGISTER_USER), dto)
    );

    expect(response).toBeDefined();
    expect(response._id).toBeDefined();
    expect(response.email).toEqual(dto.email);
    expect(response.name).toEqual(dto.name);
    expect(response.password).toBeUndefined();
    expect(response.createdAt).toBeDefined();
    expect(response.updatedAt).toBeDefined();

    userId = response._id;
  });

  it('should get all users', async () => {
    const response = await firstValueFrom(
      client.send(createPattern(UserCommands.GET_ALL_USERS), {})
    );

    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
    expect(response.length).toBeGreaterThan(0);
    expect(response[0]._id).toBeDefined();
    expect(response[0].email).toBeDefined();
    expect(response[0].name).toBeDefined();
    expect(response[0].password).toBeUndefined();
  });

  it('should get a user by id', async () => {
    const response = await firstValueFrom(
      client.send(createPattern(UserCommands.GET_USER_BY_ID), { id: userId })
    );

    expect(response).toBeDefined();
    expect(response._id).toEqual(userId);
    expect(response.email).toEqual('test@example.com');
    expect(response.name).toEqual('Test User');
    expect(response.password).toBeUndefined();
  });

  it('should update a user by id', async () => {
    const updateDto = {
      name: 'Updated Test User',
    };

    const response = await firstValueFrom(
      client.send(createPattern(UserCommands.UPDATE_USER_BY_ID), { 
        id: userId, 
        dto: updateDto 
      })
    );

    expect(response).toBeDefined();
    expect(response._id).toEqual(userId);
    expect(response.name).toEqual(updateDto.name);
    expect(response.email).toEqual('test@example.com');
    expect(response.password).toBeUndefined();
  });

  it('should delete a user by id', async () => {
    const response = await firstValueFrom(
      client.send(createPattern(UserCommands.DELETE_USER_BY_ID), { id: userId })
    );

    expect(response).toBeDefined();
    expect(response._id).toEqual(userId);
    
    // Verify the user is deleted by trying to get it
    try {
      await firstValueFrom(
        client.send(createPattern(UserCommands.GET_USER_BY_ID), { id: userId })
      );
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
}); 