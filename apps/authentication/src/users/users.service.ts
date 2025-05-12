import { Injectable } from '@nestjs/common';
import { RegisterUserDto, UserRto } from '../../../../common/user/dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registerUser(dto: RegisterUserDto): Promise<Partial<UserRto>> {
    const user = {
      email: dto.email,
      name: dto.name,
      password: dto.password, // In production, hash this!
    };
    await this.usersRepository.create(user);
    const { password, ...userRto } = user;
    return userRto;
  }

  async getAllUsers(): Promise<Partial<UserRto>[]> {
    const users = await this.usersRepository.findAll();
    return users.map(({ password, ...userRto }) => userRto);
  }
}
