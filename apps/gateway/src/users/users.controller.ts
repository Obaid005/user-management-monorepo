import { RegisterUserDto, UserRto } from '@monorepo/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

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
}
