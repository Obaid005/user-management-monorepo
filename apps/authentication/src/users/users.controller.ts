import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto, UserRto } from '@monorepo/common';
import { Types } from 'mongoose';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: 'register-user' })
  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    return this.usersService.registerUser(dto);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async getAllUsers(): Promise<UserRto[]> {
    return this.usersService.getAllUsers();
  }

  @MessagePattern({ cmd: 'get-user-by-id' })
  async getUserById(@Payload() payload: { id: Types.ObjectId }): Promise<UserRto> {
    return this.usersService.getUserById(payload.id);
  }

  @MessagePattern({ cmd: 'delete-user-by-id' })
  async deleteUserById(@Payload() payload: { id: Types.ObjectId }): Promise<UserRto> {
    return this.usersService.deleteUserById(payload.id);
  }

  @MessagePattern({ cmd: 'update-user-by-id' })
  async updateUserById(@Payload() payload: { id: Types.ObjectId, dto: UpdateUserDto }): Promise<UserRto> {
    return this.usersService.updateUserById(payload.id, payload.dto);
  }
}
