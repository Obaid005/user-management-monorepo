import { DynamicModule, Module } from '@nestjs/common';

import { MicroserviceNames } from '@monorepo/common';
import { NetworkingService } from './networking.service';

@Module({})
export class NetworkingModule {
  static forMicroservice(microserviceName: MicroserviceNames): DynamicModule {
    return {
      module: NetworkingModule,
      providers: [
        {
          provide: 'MICROSERVICE_NAME',
          useValue: microserviceName,
        },
        NetworkingService,
      ],
      exports: [NetworkingService],
    };
  }
} 