# Common Package

This package contains shared code, interfaces, and utilities that are used across multiple microservices in the monorepo.

## Contents

- **Schemas**: MongoDB schemas using NestJS's Mongoose integration
- **DTOs**: Data Transfer Objects for API requests and responses
- **Interfaces**: Common interfaces used throughout the application
- **Utils**: Shared utility functions

## How to Use

To use components from this package in other microservices, simply import them:

```typescript
import { User, IUser, RegisterUserDto } from '@monorepo/common';
```

## Development

When adding new shared components:

1. Add them to the appropriate subdirectory
2. Export them from the relevant index.ts file
3. Make sure to export them from the root index.ts as well
4. Run `npm run build` from the root directory to compile the package

## Best Practices

- Keep the common package lean and focused on truly shared functionality
- Avoid circular dependencies between microservices through the common package
- Document interfaces and exported functions 