import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, IUser, UserDocument, UpdateUserDto } from '@monorepo/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Creates a new user in the database
   * Mongoose automatically adds createdAt and updatedAt timestamps
   */
  async create(user: IUser): Promise<UserDocument> {
    // Create a new model instance, which will handle defaults
    const newUser = new this.userModel(user);
    // Save the user to the database
    return await newUser.save();
  }

  /**
   * Finds all users, excluding the password field
   * Timestamps (createdAt, updatedAt) are included by default
   */
  async findAll(): Promise<Omit<UserDocument, 'password'>[]> {
    // Select all fields except password
    return this.userModel.find().select('-password');
  }

  /**
   * Finds a user by email
   * Returns the complete user document including timestamps
   */
  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async update(id: Types.ObjectId, dto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
