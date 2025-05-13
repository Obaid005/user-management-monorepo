import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto, UserRto } from '@monorepo/common';
import { Types } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserRto: UserRto = {
    _id: new Types.ObjectId().toString(),
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    registerUser: jest.fn().mockResolvedValue(mockUserRto),
    getAllUsers: jest.fn().mockResolvedValue([mockUserRto]),
    getUserById: jest.fn().mockResolvedValue(mockUserRto),
    deleteUserById: jest.fn().mockResolvedValue(mockUserRto),
    updateUserById: jest.fn().mockResolvedValue(mockUserRto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should create a new user and return a UserRto', async () => {
      const dto: RegisterUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const result = await controller.registerUser(dto);

      expect(service.registerUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of UserRto objects', async () => {
      const result = await controller.getAllUsers();

      expect(service.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([mockUserRto]);
    });
  });

  describe('getUserById', () => {
    it('should return a UserRto for the specified id', async () => {
      const id = new Types.ObjectId();
      const payload = { id };
      
      const result = await controller.getUserById(payload);

      expect(service.getUserById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user and return the deleted UserRto', async () => {
      const id = new Types.ObjectId();
      const payload = { id };
      
      const result = await controller.deleteUserById(payload);

      expect(service.deleteUserById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('updateUserById', () => {
    it('should update a user and return the updated UserRto', async () => {
      const id = new Types.ObjectId();
      const dto: UpdateUserDto = { name: 'Updated Name' };
      const payload = { id, dto };
      
      const result = await controller.updateUserById(payload);

      expect(service.updateUserById).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockUserRto);
    });
  });
}); 