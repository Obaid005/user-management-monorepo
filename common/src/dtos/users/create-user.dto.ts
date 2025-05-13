import { IsNotEmpty, MinLength } from "class-validator";

import { IsEmail } from "class-validator";
import { IUser } from "../../schemas/user.schema";

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