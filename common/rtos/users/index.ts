import { IUser } from "@monorepo/common";

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