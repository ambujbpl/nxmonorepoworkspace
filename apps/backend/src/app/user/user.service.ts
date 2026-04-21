import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createJwtToken,
  extractBearerToken,
  hashPassword,
  verifyJwtToken,
  verifyPassword,
} from '../auth.util';
import { User, UserDocument } from '../schema/user.schema';
import { sanitizeUser } from './user.util';

@Injectable()
export class UserService {
  private readonly jwtSecret =
    process.env.JWT_SECRET ?? 'development-jwt-secret';

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    name: string,
    email: string,
    age: number | undefined,
    password: string,
  ) {
    try {
      const hashedPassword = hashPassword(password);
      const user = new this.userModel({
        name,
        email,
        age,
        password: hashedPassword,
      });

      const savedUser = await user.save();
      return sanitizeUser(savedUser);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException(`Email ${email} already exists`);
      }

      throw error;
    }
  }

  async login(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user || !verifyPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: createJwtToken(user.id, user.email, this.jwtSecret),
      // user: sanitizeUser(user),
    };
  }

  async changePassword(
    authorization: string | undefined,
    currentPassword: string,
    newPassword: string,
  ) {
    const token = extractBearerToken(authorization);
    const payload = verifyJwtToken(token, this.jwtSecret);
    const user = await this.userModel
      .findById(payload.sub)
      .select('+password')
      .exec();

    if (!user) {
      throw new NotFoundException(
        `User with id ${payload.sub} not found in DB`,
      );
    }

    if (!verifyPassword(currentPassword, user.password)) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = hashPassword(newPassword);
    await user.save();

    return {
      message: 'Password changed successfully',
    };
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => sanitizeUser(user));
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found in DB`);
    }

    return sanitizeUser(user);
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const sanitizedUpdateData = { ...updateData };

    if (typeof sanitizedUpdateData.password === 'string') {
      sanitizedUpdateData.password = hashPassword(sanitizedUpdateData.password);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, sanitizedUpdateData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found in DB`);
    }

    return sanitizeUser(updatedUser);
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found in DB`);
    }

    return sanitizeUser(deletedUser);
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
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      return {
        status: 'disconnected',
        message: `MongoDB connection failed: ${errorMessage}`,
      };
    }
  }
}
