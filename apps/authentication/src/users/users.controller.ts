import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { RegisterUserDto } from '../../../../common/user/dtos/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register-user' })
  async registerUser(dto: RegisterUserDto) {
    return this.usersService.registerUser(dto);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
