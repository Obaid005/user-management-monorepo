import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface UserEntity {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    await this.userModel.create(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userModel.find().lean();
  }
}
