import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUser } from '../../schemas/user.schema';

/**
 * Data transfer object for user registration
 * Used for validating user registration requests
 */
export class RegisterUserDto implements Partial<IUser> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}

/**
 * User response transfer object
 * Used ONLY for returning user data in API responses
 * Must include _id for client-side identification
 * Must NEVER include sensitive data like passwords
 */
export class UserRto implements Partial<IUser> {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
} 