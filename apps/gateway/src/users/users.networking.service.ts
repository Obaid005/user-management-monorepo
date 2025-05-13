import { Injectable } from '@nestjs/common';
import { NetworkingService } from '../shared/networking/networking.service';
import { RegisterUserDto, UpdateUserDto, UserRto, UserCommands } from '@monorepo/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class UsersNetworkingService {
  constructor(private readonly networkingService: NetworkingService) {}

  /**
   * Register a new user
   */
  registerUser(dto: RegisterUserDto): Observable<UserRto> {
    return this.networkingService.send<UserRto, RegisterUserDto>(
      UserCommands.REGISTER_USER,
      dto
    );
  }

  /**
   * Get all users
   */
  getAllUsers(): Observable<UserRto[]> {
    return this.networkingService.send<UserRto[], {}>(
      UserCommands.GET_ALL_USERS,
      {}
    );
  }

  /**
   * Get user by ID
   */
  getUserById(id: Types.ObjectId): Observable<UserRto> {
    return this.networkingService.send<UserRto, { id: Types.ObjectId }>(
      UserCommands.GET_USER_BY_ID,
      { id }
    );
  }

  /**
   * Delete user by ID
   */
  deleteUserById(id: Types.ObjectId): Observable<UserRto> {
    return this.networkingService.send<UserRto, { id: Types.ObjectId }>(
      UserCommands.DELETE_USER_BY_ID,
      { id }
    );
  }

  /**
   * Update user by ID
   */
  updateUserById(id: Types.ObjectId, dto: UpdateUserDto): Observable<UserRto> {
    return this.networkingService.send<UserRto, { id: Types.ObjectId, dto: UpdateUserDto }>(
      UserCommands.UPDATE_USER_BY_ID,
      { id, dto }
    );
  }
} 