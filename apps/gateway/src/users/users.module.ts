import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersNetworkingService } from './users.networking.service';
import { NetworkingModule } from '../shared/networking/networking.module';
import { MicroserviceNames } from '@monorepo/common';

@Module({
  imports: [
    NetworkingModule.forMicroservice(MicroserviceNames.AUTHENTICATION)
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersNetworkingService],
})
export class UsersModule {}
