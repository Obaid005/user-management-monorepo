# Users Microservices Monorepo

A scalable NestJS monorepo containing microservices for user management.

## Project Structure

This monorepo includes:

### Applications
- **Gateway**: REST API service that delegates requests to the Authentication microservice
- **Authentication**: Microservice containing business logic for user management

### Libraries
- **Common**: Shared library containing DTOs, RTOs, schemas, decorators, pipes, and microservice configurations

## Architecture Overview

```
┌────────────┐     ┌────────────────────┐
│            │     │                    │
│  Gateway   │────▶│  Authentication    │
│  (REST)    │     │  (Microservice)    │
│            │     │                    │
└────────────┘     └────────────────────┘
       ▲                     ▲
       │                     │
       └─────────┬───────────┘
                 │
          ┌──────▼─────┐
          │            │
          │  Common    │
          │  Library   │
          │            │
          └────────────┘
```

- **Gateway** exposes REST endpoints to clients
- **Authentication** implements business logic and database operations
- **Common** provides shared code for consistency across services

## Technical Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Communication**: TCP Microservices
- **Testing**: Jest

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- MongoDB instance

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd users-monorepo
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Create `apps/authentication/.env` with MongoDB connection details
```
MONGO_URI=mongodb://localhost:27017/users
```

### Running the Services

#### Development Mode

Start both services in watch mode:
```bash
npm run start:dev
```

Start services individually:
```bash
# Start Gateway
npm run start:gateway

# Start Authentication service
npm run start:auth
```

#### Production Mode

Build for production:
```bash
npm run build
```

Run in production mode:
```bash
npm run start:prod
```

## Testing

```bash
npm test
```

Run tests with coverage:
```bash
npm run test:cov
```

Run tests for a specific application:
```bash
cd apps/authentication && npx jest --config=jest.config.ts
```

Run a specific test file:
```bash
cd apps/authentication && npx jest --config=jest.config.ts users/users.service.spec.ts
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Structure

The Authentication microservice includes comprehensive unit tests covering:

- **DTO Validation**: Ensures input validation works correctly
- **Repository Layer**: Tests database operations
- **Service Layer**: Tests business logic implementation
- **Controller Layer**: Tests API endpoints and request handling
- **Module Integration**: Tests correct module configuration

When adding new features, always include appropriate tests following these patterns.

## Docker Deployment

The project includes Dockerfiles for containerization.

Example for building the Gateway:
```bash
docker build -t users-gateway -f apps/gateway/Dockerfile .
```

Run the container:
```bash
docker run -p 3000:3000 users-gateway
```

## Project Structure Details

### Gateway
- Acts as an API facade
- Handles HTTP requests and converts them to microservice messages
- Uses the networking service to communicate with the Authentication microservice

### Authentication
- Implements all business logic
- Manages database operations
- Contains unit tests for business logic validation
- Exposes functionality through microservice patterns

### Common Library
- **DTOs**: Data Transfer Objects for validating input data
- **RTOs**: Response Transfer Objects for standardized responses
- **Schemas**: Database schemas
- **Decorators**: Custom decorators for controllers and methods
- **Pipes**: Validation and transformation pipes
- **Microservice**: Communication patterns and configurations

## How to Extend and Scale

### Adding New Features

1. Define DTOs and RTOs in the Common library
2. Add new microservice patterns in `common/src/microservice/patterns.ts`
3. Implement business logic in the Authentication service
4. Create REST endpoints in the Gateway service

### Adding New Microservices

1. Create a new service using NestJS CLI:
```bash
npx nest g app new-service
```

2. Configure it as a microservice in its `main.ts`:
```typescript
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4002, // Use a unique port
    },
  },
);
```

3. Update the Gateway to communicate with the new service

### Scaling Considerations

- **Horizontal Scaling**: Each microservice can be scaled independently
- **Load Balancing**: Consider implementing a load balancer for Gateway and Authentication services
- **Database Scaling**: Consider MongoDB sharding or replicas for high-volume deployments
- **Message Broker**: For more complex scenarios, consider replacing TCP with RabbitMQ or Kafka

## Best Practices

1. Keep business logic in the Authentication service
2. Use the Common library for all shared code
3. Write comprehensive tests for all business logic
4. Maintain consistent error handling across microservices
5. Document all API endpoints and microservice patterns
6. Follow NestJS dependency injection patterns

## Contributing

1. Create a feature branch from develop
2. Implement your changes with appropriate tests
3. Ensure all tests pass
4. Create a pull request

## Troubleshooting

### Common Issues

#### Module Resolution Problems
If you encounter errors like `Cannot find module '@monorepo/common'`, check:
- The paths configuration in tsconfig.json files
- The moduleNameMapper in jest.config.ts files
- Make sure the common library is built before running tests

#### Microservice Connection Issues
If the Gateway cannot connect to the Authentication service:
- Verify the TCP connection settings (host & port)
- Ensure the Authentication service is running
- Check for network restrictions between services