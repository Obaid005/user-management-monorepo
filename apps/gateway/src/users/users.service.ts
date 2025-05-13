import { Injectable } from '@nestjs/common';
import { UsersNetworkingService } from './users.networking.service';
import { RegisterUserDto, UserRto, UpdateUserDto } from '@monorepo/common';
import { Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersNetworkingService: UsersNetworkingService) {}

  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    return firstValueFrom(this.usersNetworkingService.registerUser(dto));
  }

  async getAllUsers(): Promise<UserRto[]> {
    return firstValueFrom(this.usersNetworkingService.getAllUsers());
  }

  async getUserById(id: Types.ObjectId): Promise<UserRto> {
    return firstValueFrom(this.usersNetworkingService.getUserById(id));
  }

  async deleteUserById(id: Types.ObjectId): Promise<UserRto> {
    return firstValueFrom(this.usersNetworkingService.deleteUserById(id));
  }

  async updateUserById(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserRto> {
    return firstValueFrom(this.usersNetworkingService.updateUserById(id, dto));
  }
}
