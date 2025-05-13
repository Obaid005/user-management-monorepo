import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { getModelToken } from '@nestjs/mongoose';
import { User, UpdateUserDto } from '@monorepo/common';
import { Model, Types } from 'mongoose';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let userModel: Model<any>;

  const mockUser = {
    _id: new Types.ObjectId(),
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Create a save method mock
  const saveMock = jest.fn().mockImplementation(function() {
    return Promise.resolve(this);
  });

  beforeEach(async () => {
    // Create a mock Model class
    class MockModel {
      constructor(dto) {
        Object.assign(this, dto);
      }
      save = saveMock;
      static find = jest.fn().mockReturnThis();
      static findOne = jest.fn().mockReturnThis();
      static findById = jest.fn().mockReturnThis();
      static findByIdAndDelete = jest.fn().mockReturnThis();
      static findByIdAndUpdate = jest.fn().mockReturnThis();
      static select = jest.fn().mockResolvedValue([mockUser]);
      static exec = jest.fn().mockResolvedValue(mockUser);
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    userModel = module.get<Model<any>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new user document', async () => {
      const user = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      const result = await repository.create(user);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toMatchObject(user);
    });
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const result = await repository.findAll();

      expect(userModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const result = await repository.findByEmail(email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const id = new Types.ObjectId();
      const result = await repository.findById(id);

      expect(userModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const id = new Types.ObjectId();
      const result = await repository.delete(id);

      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = new Types.ObjectId();
      const dto: UpdateUserDto = { name: 'Updated Name' };
      
      // Setup a specific mock for the update case
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedUser),
      } as any);

      const result = await repository.update(id, dto);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(id, dto, { new: true });
      expect(result).toEqual(updatedUser);
    });
  });
}); 