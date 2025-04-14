import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signupWithEmail(dto: CreateUserDto) {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({ ...dto, password: hashed });
    return this.getTokens(user);
  }

  async loginWithEmail(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.getTokens(user);
  }

  async getTokens(user: any) {
    const payload = { sub: user._id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      user: { id: user._id, email: user.email, name: user.name },
    };
  }
}