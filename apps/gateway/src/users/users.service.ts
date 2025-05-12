import { Injectable } from '@nestjs/common';
import { NetworkingService } from './networking.service';
import { RegisterUserDto, UserRto } from '../../../../common/user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly networkingService: NetworkingService) {}

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
}
