import { Injectable } from '@nestjs/common';
import { RegisterUserDto, UserDocument, UserRto, IUser, UpdateUserDto } from '@monorepo/common';
import { UsersRepository } from './users.repository';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    const user: IUser = {
      email: dto.email,
      name: dto.name,
      password: dto.password, // In production, hash this!
    };
    // Get the created user directly from create method
    const createdUser = await this.usersRepository.create(user);
    // Transform to RTO
    return {
      _id: createdUser._id.toString(),
      email: createdUser.email,
      name: createdUser.name,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    };
  }

  async getAllUsers(): Promise<UserRto[]> {
    const users = await this.usersRepository.findAll();
    
    // Map to UserRto format
    return users.map(user => ({
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async getUserById(id: Types.ObjectId): Promise<UserRto> {
    const user = await this.usersRepository.findById(id);
    return {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async deleteUserById(id: Types.ObjectId): Promise<UserRto> {
    const deletedUser = await this.usersRepository.delete(id);
    return {
      _id: deletedUser._id.toString(),
      email: deletedUser.email,
      name: deletedUser.name,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt
    };
  }

  async updateUserById(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserRto> {
    const updatedUser = await this.usersRepository.update(id, dto);
    return {
      _id: updatedUser._id.toString(),
      email: updatedUser.email,
      name: updatedUser.name,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };
  }
}
