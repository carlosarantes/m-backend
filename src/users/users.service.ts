import { ConflictException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async store(data: CreateUserDto): Promise<unknown> {
    const user = this.findByEmail(data.email);
    if (!!user)
      throw new ConflictException("There's already a user with this e-mail");

    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, data: UpdateUserDto): Promise<unknown> {
    return await this.userModel.updateOne({ id }, data);
  }

  async delete(id: string): Promise<unknown> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
