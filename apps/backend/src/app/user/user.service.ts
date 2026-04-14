import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(name: string, email: string, age?: number) {
    const user = new this.userModel({ name, email, age });
    return user.save();
  }

  async getUsers() {
    return this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateData: Partial<User>) {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async checkMongoDBConnection() {
    try {
      const count = await this.userModel.countDocuments();
      return {
        status: 'connected',
        message: 'Connected to MongoDB',
        userCount: count,
      };
    } catch (error) {
      return {
        status: 'disconnected',
        message: `MongoDB connection failed: ${error.message}`,
      };
    }
  }
}
