import { RegisterUserDto, UserRto, UpdateUserDto } from '@monorepo/common';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { ObjectId } from '@monorepo/common';

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiResponse({ status: 201, type: UserRto })
  async register(@Body() dto: RegisterUserDto): Promise<UserRto> {
    return this.usersService.registerUser(dto);
  }

  @Get('users')
  @ApiResponse({ status: 200, type: [UserRto] })
  async getAllUsers(): Promise<UserRto[]> {
    return this.usersService.getAllUsers();
  }

  @Get('users/:id')
  @ApiResponse({ status: 200, type: UserRto })
  async getUserById(@Param('id') id: Types.ObjectId): Promise<UserRto> {
    return this.usersService.getUserById(id);
  }

  @Delete('users/:id')
  @ApiResponse({ status: 200, type: UserRto })
  async deleteUserById(@Param('id') id: Types.ObjectId): Promise<UserRto> {
    return this.usersService.deleteUserById(id);
  }

  @Put('users/:id')
  @ApiResponse({ status: 200, type: UserRto })
  async updateUserById(
    @Param('id') id: Types.ObjectId,
    @Body() dto: UpdateUserDto
  ): Promise<UserRto> {
    return this.usersService.updateUserById(id, dto);
  }
}
