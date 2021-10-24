import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';

import { CreateUserDto, UpdateUserDto, FilterUsersDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Hash } from 'src/utils/Hash';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll(params?: FilterUsersDto) {
    if (params) {
      const filters: FilterQuery<User> = {};
      const { limit, offset } = params;
      return this.userModel.find(filters).limit(limit).skip(offset).exec();
    }
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Not exists user with the ID #${id}`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    const userPasswordHashed = Hash.make(newModel.password);
    newModel.password = userPasswordHashed;
    newModel.save();
    return plainToClass(User, newModel);
  }

  update(id: number, data: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`Not exists user with the ID #${id}`);
    }
    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);
    if (user) {
      return this.userModel.findByIdAndRemove(id).exec();
    }
    return null;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
