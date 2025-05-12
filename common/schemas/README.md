# Shared Mongoose Schemas

This directory contains shared MongoDB schemas used across the microservices in this monorepo.

## Structure

- Each schema is defined using NestJS's `@nestjs/mongoose` decorators
- Schemas define both the MongoDB document structure and TypeScript interfaces
- Schemas include automatic timestamps (`createdAt` and `updatedAt`) 
- Every schema exports:
  - A base interface (e.g., `IUser`) for plain object operations
  - A Document class (e.g., `User`) that extends Mongoose's Document
  - A Document type (e.g., `UserDocument`) for Mongoose model operations
  - The schema itself (e.g., `UserSchema`)

## Type Usage Guidelines

### When to use IUser
- For creating new documents (before they have an ID)
- For internal data transfers that include all fields
- When working with complete user data including sensitive fields

### When to use UserDocument
- In repositories when working with the MongoDB model
- When you need Mongoose document methods like `.save()`
- For database operations that return full document objects

### When to use UserRto
- ONLY for API responses sent to clients
- Must include the document ID (`_id`) for client-side identification
- Must NEVER include sensitive fields like passwords
- May include additional fields needed by clients

## Usage in Repositories

When creating repositories that use these schemas:

```typescript
// Import what you need
import { User, IUser, UserDocument } from '@monorepo/common';

@Injectable()
export class SomeRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Use IUser when working with plain objects
  async create(userData: IUser): Promise<void> {
    await this.userModel.create(userData);
  }

  // Return UserDocument when client needs full document
  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
  
  // Return IUser when working with plain objects
  async findAllLean(): Promise<IUser[]> {
    return this.userModel.find().lean();
  }
  
  // Exclude sensitive fields when returning data
  async findAllSafe(): Promise<Omit<UserDocument, 'password'>[]> {
    return this.userModel.find().select('-password');
  }
}
```

## Usage in Services

In your services, transform between types as needed:

```typescript
import { IUser, UserDocument, UserRto, RegisterUserDto } from '@monorepo/common';

@Injectable() 
export class SomeService {
  // Accept DTO, work with IUser internally
  async registerUser(dto: RegisterUserDto): Promise<UserRto> {
    const user: IUser = {
      email: dto.email,
      name: dto.name,
      password: dto.password, // Should be hashed
    };
    
    const savedUser = await this.repository.create(user);
    
    // Transform to RTO for API response
    return {
      _id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt
    };
  }
}
```

## Adding New Schemas

To add a new schema:

1. Create a new file in this directory (e.g., `product.schema.ts`)
2. Define the interface, schema class, and export the schema
3. Export it from the `index.ts` file
4. Use it in your microservices by importing from `@monorepo/common` 