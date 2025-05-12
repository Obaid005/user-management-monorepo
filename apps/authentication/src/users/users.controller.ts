import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { RegisterUserDto, UserRto } from '@monorepo/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register-user' })
  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    return this.usersService.registerUser(dto);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers(): Promise<UserRto[]> {
    return this.usersService.getAllUsers();
  }
}
