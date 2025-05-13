import { MicroserviceConfig, MicroserviceNames } from './types';

/**
 * Configuration for all microservices
 */
export const MICROSERVICE_CONFIG: Record<MicroserviceNames, MicroserviceConfig> = {
  [MicroserviceNames.AUTHENTICATION]: {
    host: '127.0.0.1',
    port: 4001,
  },
  // Add more microservice configurations as needed
}; 