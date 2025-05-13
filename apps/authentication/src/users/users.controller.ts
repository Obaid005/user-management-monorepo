import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { RegisterUserDto, UpdateUserDto, UserRto, UserCommands, createPattern } from '@monorepo/common';
import { Types } from 'mongoose';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern(createPattern(UserCommands.REGISTER_USER))
  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    return this.usersService.registerUser(dto);
  }

  @MessagePattern(createPattern(UserCommands.GET_ALL_USERS))
  async getAllUsers(): Promise<UserRto[]> {
    return this.usersService.getAllUsers();
  }

  @MessagePattern(createPattern(UserCommands.GET_USER_BY_ID))
  async getUserById(@Payload() payload: { id: Types.ObjectId }): Promise<UserRto> {
    return this.usersService.getUserById(payload.id);
  }

  @MessagePattern(createPattern(UserCommands.DELETE_USER_BY_ID))
  async deleteUserById(@Payload() payload: { id: Types.ObjectId }): Promise<UserRto> {
    return this.usersService.deleteUserById(payload.id);
  }

  @MessagePattern(createPattern(UserCommands.UPDATE_USER_BY_ID))
  async updateUserById(@Payload() payload: { id: Types.ObjectId, dto: UpdateUserDto }): Promise<UserRto> {
    return this.usersService.updateUserById(payload.id, payload.dto);
  }
}
