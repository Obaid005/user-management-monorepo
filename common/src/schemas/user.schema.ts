import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Plain user interface for data operations
 */
export interface IUser {
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User schema class - do NOT extend Document here
 */
@Schema({
  timestamps: true,
})
export class User implements IUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  // These will be automatically populated by mongoose
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UserDocument type for MongoDB operations
 */
export type UserDocument = HydratedDocument<User>;

/**
 * The Mongoose schema
 */
export const UserSchema = SchemaFactory.createForClass(User); 