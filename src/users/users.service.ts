import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async store(data: CreateUserDto): Promise<unknown> {
    const user = await this.findByEmail(data.email);

    if (!!user)
      throw new ConflictException("There's already a user with this e-mail");

    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password').exec();
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).select('-password').exec();
    } catch (error) {
      throw new NotFoundException('This user was not found');
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<unknown> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, data).exec();
      return { ...user.toJSON(), ...data };
    } catch (error) {
      throw new NotFoundException('This user was not found');
    }
  }

  async delete(id: string): Promise<unknown> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) throw new ConflictException('This user does not exists.');
      return;
    } catch (error) {
      throw new NotFoundException('This user was not found');
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
