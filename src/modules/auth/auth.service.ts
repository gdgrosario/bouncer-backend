import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PayloadToken } from './models/payloadToken.model';
import { Hash } from 'src/utils/Hash';
import { CreateUserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = Hash.compare(password, user.password);
      if (isMatch) {
        this.generateJWT(user);
      }
    }
    throw new NotFoundException(`User not found. Verify your credentials.`);
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    const objUserToReturn = plainToClass(User, user);
    return {
      access_token: this.jwtService.sign(payload),
      objUserToReturn,
    };
  }

  register(data: CreateUserDto) {
    const user = this.usersService.findByEmail(data.email);
    if (!user) {
      this.usersService.create(data);
    } else {
      throw new BadRequestException(`The email ${data.email} is already used.`);
    }
  }
}
