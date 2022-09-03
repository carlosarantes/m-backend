import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async store(data: any): Promise<unknown> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findAll(): Promise<unknown> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<unknown> {
    return this.userModel.findById(id);
  }

  async update(id: string, data: any): Promise<unknown> {
    return this.userModel.updateOne({ id }, data);
  }

  async delete(id: string): Promise<unknown> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
