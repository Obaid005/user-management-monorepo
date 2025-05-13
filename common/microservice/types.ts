import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/**
 * Microservice configuration by name
 */
export interface MicroserviceConfig {
  host: string;
  port: number;
}

/**
 * Registry of all microservices
 */
export enum MicroserviceNames {
  AUTHENTICATION = 'authentication',
  // Add more microservices here
}

/**
 * Generic interface for network request payloads
 */
export interface NetworkRequest<T = any> {
  pattern: { cmd: string };
  payload: T;
}

/**
 * Type-safe client interface
 */
export interface TypedClientProxy extends ClientProxy {
  send<TResult = any, TInput = any>(
    pattern: { cmd: string },
    data: TInput,
  ): Observable<TResult>;
} 