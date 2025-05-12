import { Injectable } from '@nestjs/common';
import { RegisterUserDto, UserDocument, UserRto, IUser } from '@monorepo/common';
import { UsersRepository } from './users.repository';

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
}
