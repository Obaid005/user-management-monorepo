import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { 
  MICROSERVICE_CONFIG, 
  MicroserviceNames, 
  TypedClientProxy,
  createPattern
} from '@monorepo/common';

@Injectable()
export class NetworkingService implements OnModuleInit {
  private client: TypedClientProxy;

  constructor(
    @Inject('MICROSERVICE_NAME') private readonly microserviceName: MicroserviceNames
  ) {}

  onModuleInit() {
    const config = MICROSERVICE_CONFIG[this.microserviceName];
    
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.host,
        port: config.port,
      },
    }) as TypedClientProxy;
  }

  /**
   * Send a command to the microservice with strongly typed pattern and payload
   */
  send<TResult = any, TInput = any>(
    command: string,
    data: TInput
  ): Observable<TResult> {
    return this.client.send<TResult, TInput>(
      createPattern(command),
      data
    );
  }
} 