import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NetworkingService } from './networking.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, NetworkingService],
})
export class UsersModule {}
