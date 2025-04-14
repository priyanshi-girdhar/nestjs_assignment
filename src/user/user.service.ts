import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUserProfile(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  updateUserProfile(id: string, dto: UpdateProfileDto) {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).select('-password');
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }
}