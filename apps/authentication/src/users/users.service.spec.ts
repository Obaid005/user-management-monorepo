import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RegisterUserDto, UpdateUserDto } from '@monorepo/common';
import { Types } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUser = {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserRto = {
    _id: mockUser._id.toString(),
    email: mockUser.email,
    name: mockUser.name,
    createdAt: mockUser.createdAt,
    updatedAt: mockUser.updatedAt,
  };

  const mockUsersRepository = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should create a new user and return a UserRto', async () => {
      const dto: RegisterUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const result = await service.registerUser(dto);

      expect(repository.create).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
        password: dto.password,
      });
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of UserRto objects', async () => {
      const result = await service.getAllUsers();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUserRto]);
    });
  });

  describe('getUserById', () => {
    it('should return a UserRto for the specified id', async () => {
      const id = new Types.ObjectId();
      const result = await service.getUserById(id);

      expect(repository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user and return the deleted UserRto', async () => {
      const id = new Types.ObjectId();
      const result = await service.deleteUserById(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUserRto);
    });
  });

  describe('updateUserById', () => {
    it('should update a user and return the updated UserRto', async () => {
      const id = new Types.ObjectId();
      const dto: UpdateUserDto = { name: 'Updated Name' };
      
      const result = await service.updateUserById(id, dto);

      expect(repository.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(mockUserRto);
    });
  });
}); 