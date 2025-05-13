import { Injectable } from '@nestjs/common';
import { NetworkingService } from './networking.service';
import { RegisterUserDto, UserRto, UpdateUserDto } from '@monorepo/common';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly networkingService: NetworkingService) { }

  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    return this.networkingService
      .send({ cmd: 'register-user' }, dto)
      .toPromise();
  }

  async getAllUsers(): Promise<UserRto[]> {
    return this.networkingService
      .send({ cmd: 'get-all-users' }, {})
      .toPromise();
  }

  async getUserById(id: Types.ObjectId): Promise<UserRto> {
    return this.networkingService
      .send({ cmd: 'get-user-by-id' }, { id })
      .toPromise();
  }

  async deleteUserById(id: Types.ObjectId): Promise<UserRto> {
    return this.networkingService
      .send({ cmd: 'delete-user-by-id' }, { id })
      .toPromise();
  }

  async updateUserById(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserRto> {
    return this.networkingService
      .send({ cmd: 'update-user-by-id' }, { id, dto })
      .toPromise();
  }
}
